import { GoogleGenAI, ThinkingLevel } from '@google/genai'

const MAX_MESSAGES = 8
const MAX_MESSAGE_LENGTH = 500

const PAGE_CONTEXT = `
Informações disponíveis nesta landing page demonstrativa:
- Cursos em destaque: Medicina, Direito, Odontologia, Enfermagem, Psicologia e Engenharia de Software.
- Unidades apresentadas: Feira de Santana, Itabuna, Jequié e Vitória da Conquista, todas na Bahia.
- Formas de ingresso apresentadas: Vestibular Online, uso da nota do ENEM e Transferência / 2ª Graduação.
- A página contém um formulário demonstrativo de interesse para nome, e-mail, telefone, unidade e curso.
`

export const SYSTEM_INSTRUCTION = `
Você é o assistente virtual demonstrativo de um projeto acadêmico da landing page da UNEX.
Responda sempre em português do Brasil, com clareza, cordialidade e objetividade.
Use exclusivamente as informações fornecidas no contexto da página abaixo.
Não invente mensalidades, bolsas, descontos, datas de vestibular, notas de corte, endereços ou qualquer informação institucional que não esteja no contexto.
Quando a pergunta depender de informação oficial ou atualizada, explique que você não possui esse dado e recomende confirmar nos canais oficiais da UNEX.
Não afirme que é um canal oficial. A interface já informa que este é um assistente automatizado demonstrativo, portanto não repita esse aviso nas respostas, exceto se o usuário perguntar diretamente quem ou o que você é.
Responda em texto simples, sem Markdown, asteriscos, títulos ou formatação especial.
Se a pergunta estiver fora do escopo, informe educadamente que você só pode ajudar com o conteúdo apresentado na landing page.

${PAGE_CONTEXT}
`

export function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return []

  return messages
    .filter(
      (message) =>
        message &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim(),
    )
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content.trim().slice(0, MAX_MESSAGE_LENGTH) }],
    }))
}

async function generateWithRetry(ai, request) {
  const attempts = [
    { delay: 0, model: request.model, thinkingLevel: ThinkingLevel.LOW },
    { delay: 500, model: 'gemini-3.5-flash-lite', thinkingLevel: ThinkingLevel.MINIMAL },
    { delay: 1_200, model: 'gemini-3.5-flash-lite', thinkingLevel: ThinkingLevel.MINIMAL },
  ]
  let lastError

  for (const { delay, model, thinkingLevel } of attempts) {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay))
    try {
      return await ai.models.generateContent({
        ...request,
        model,
        config: {
          ...request.config,
          thinkingConfig: { thinkingLevel },
        },
      })
    } catch (error) {
      lastError = error
      if (error?.status !== 429 && error?.status !== 503) throw error
    }
  }

  throw lastError
}

export function createChatHandler(createClient = (apiKey) => new GoogleGenAI({ apiKey })) {
  return async function handler(request, response) {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST')
      return response.status(405).json({ error: 'Método não permitido.' })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return response.status(503).json({
        error: 'O assistente está temporariamente indisponível. Tente novamente mais tarde.',
      })
    }

    const messages = sanitizeMessages(request.body?.messages)
    if (!messages.length || messages.at(-1)?.role !== 'user') {
      return response.status(400).json({ error: 'Envie uma mensagem válida para continuar.' })
    }

    try {
      const ai = createClient(apiKey)
      const result = await generateWithRetry(ai, {
        model: 'gemini-3.8-flash',
        contents: messages,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 350,
          temperature: 0.2,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      })

      const reply = result.text?.trim()
      if (!reply) {
        throw new Error('O Gemini retornou uma resposta vazia.')
      }

      return response.status(200).json({ reply })
    } catch (error) {
      console.error('Falha ao consultar o Gemini:', error)
      return response.status(502).json({
        error: 'Não foi possível obter uma resposta agora. Por favor, tente novamente.',
      })
    }
  }
}

export default createChatHandler()
