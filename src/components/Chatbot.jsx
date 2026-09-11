import { useEffect, useRef, useState } from 'react'
import { Bot, Loader2, MessageCircle, Send, X } from 'lucide-react'

const MAX_INPUT_LENGTH = 500
const MAX_HISTORY = 8
const INITIAL_MESSAGE = {
  role: 'assistant',
  content:
    'Olá! Sou um assistente virtual automatizado e demonstrativo deste projeto acadêmico. Posso ajudar com os cursos, unidades e formas de ingresso exibidos nesta página.',
}

const QUICK_QUESTIONS = [
  'Quais cursos aparecem na página?',
  'Quais unidades são apresentadas?',
  'Como posso ingressar?',
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [isOpen, messages, isLoading])

  async function sendMessage(text = input) {
    const content = text.trim().slice(0, MAX_INPUT_LENGTH)
    if (!content || isLoading) return

    const userMessage = { role: 'user', content }
    const requestMessages = [...messages, userMessage].slice(-MAX_HISTORY)

    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: requestMessages }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível consultar o assistente.')
      }

      setMessages((current) => [
        ...current,
        { role: 'assistant', content: data.reply },
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            error.message ||
            'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage()
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[70] flex flex-col items-end">
      {isOpen && (
        <section
          aria-label="Assistente virtual demonstrativo"
          className="mb-3 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between bg-gradient-to-r from-slate-950 to-red-950 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
                <Bot size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-bold">Assistente UNEX IA</h2>
                <p className="text-[11px] text-slate-300">Demonstração acadêmica automatizada</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Fechar assistente"
            >
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <p
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-red-600 text-white'
                      : message.isError
                        ? 'rounded-bl-md border border-red-200 bg-red-50 text-red-800'
                        : 'rounded-bl-md border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2 pt-1">
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    disabled={isLoading}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-red-300 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-500 shadow-sm">
                  <Loader2 size={16} className="animate-spin text-red-600" />
                  Pensando...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label htmlFor="chatbot-message" className="sr-only">
                  Digite sua pergunta
                </label>
                <textarea
                  ref={inputRef}
                  id="chatbot-message"
                  rows="1"
                  maxLength={MAX_INPUT_LENGTH}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      handleSubmit(event)
                    }
                  }}
                  disabled={isLoading}
                  placeholder="Pergunte sobre a página..."
                  className="max-h-24 min-h-11 w-full resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Enviar mensagem"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <div className="mt-1.5 flex justify-between px-1 text-[10px] text-slate-400">
              <span>Confirme informações oficiais com a UNEX.</span>
              <span>{input.length}/{MAX_INPUT_LENGTH}</span>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group flex h-14 items-center gap-2 rounded-full bg-red-600 px-4 text-white shadow-xl shadow-red-900/25 transition hover:-translate-y-0.5 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fechar assistente virtual' : 'Abrir assistente virtual'}
      >
        {isOpen ? <X size={23} /> : <MessageCircle size={23} />}
        <span className="text-sm font-bold">Fale com a IA</span>
      </button>
    </div>
  )
}
