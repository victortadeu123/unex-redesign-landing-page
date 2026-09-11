import assert from 'node:assert/strict'
import test from 'node:test'
import { createChatHandler, sanitizeMessages, SYSTEM_INSTRUCTION } from '../api/chat.js'

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.body = body
      return this
    },
  }
}

function expectedReply(question) {
  if (question.includes('cursos')) {
    return 'A página apresenta Medicina, Direito, Odontologia, Enfermagem, Psicologia e Engenharia de Software.'
  }
  if (question.includes('unidades')) {
    return 'As unidades apresentadas são Feira de Santana, Itabuna, Jequié e Vitória da Conquista.'
  }
  if (question.includes('ingressar')) {
    return 'Você pode ingressar pelo Vestibular Online, pela nota do ENEM ou por Transferência / 2ª Graduação.'
  }
  return 'Não tenho informações sobre mensalidades. Confirme esse valor nos canais oficiais da UNEX.'
}

function fakeClient() {
  return {
    models: {
      async generateContent({ contents, config }) {
        assert.equal(config.systemInstruction, SYSTEM_INSTRUCTION)
        assert.equal(config.maxOutputTokens, 350)
        const question = contents.at(-1).parts[0].text
        return { text: expectedReply(question) }
      },
    },
  }
}

test('limita o histórico e o tamanho das mensagens', () => {
  const input = Array.from({ length: 10 }, (_, index) => ({
    role: index % 2 ? 'assistant' : 'user',
    content: 'x'.repeat(600),
  }))
  const result = sanitizeMessages(input)
  assert.equal(result.length, 8)
  assert.equal(result[0].parts[0].text.length, 500)
  assert.equal(result[1].role, 'model')
})

for (const question of [
  'Quais cursos aparecem na página?',
  'Quais unidades são apresentadas?',
  'Como posso ingressar?',
  'Qual é a mensalidade de Medicina?',
]) {
  test(`processa o caso principal: ${question}`, async () => {
    process.env.GEMINI_API_KEY = 'test-only-key'
    const response = createResponse()
    await createChatHandler(fakeClient)(
      { method: 'POST', body: { messages: [{ role: 'user', content: question }] } },
      response,
    )
    assert.equal(response.statusCode, 200)
    assert.equal(response.body.reply, expectedReply(question))
    if (question.includes('mensalidade')) {
      assert.match(response.body.reply, /não tenho informações/i)
      assert.match(response.body.reply, /canais oficiais/i)
    }
  })
}

test('retorna erro amigável quando a chave não está configurada', async () => {
  delete process.env.GEMINI_API_KEY
  const response = createResponse()
  await createChatHandler(fakeClient)(
    { method: 'POST', body: { messages: [{ role: 'user', content: 'Olá' }] } },
    response,
  )
  assert.equal(response.statusCode, 503)
  assert.match(response.body.error, /temporariamente indisponível/i)
})
