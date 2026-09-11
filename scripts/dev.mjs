import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'
import react from '@vitejs/plugin-react'
import { build, loadEnv } from 'vite'
import chatHandler from '../api/chat.js'

const portArgumentIndex = process.argv.indexOf('--port')
const argumentPort = portArgumentIndex >= 0 ? process.argv[portArgumentIndex + 1] : undefined
const port = Number(argumentPort || process.env.PORT || 5173)
const root = process.cwd()
const distDirectory = join(root, 'dist')
const localEnv = loadEnv('development', root, '')

if (!process.env.GEMINI_API_KEY && localEnv.GEMINI_API_KEY) {
  process.env.GEMINI_API_KEY = localEnv.GEMINI_API_KEY
}

await build({ configFile: false, plugins: [react()] })

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
}

function addResponseHelpers(response) {
  response.status = (statusCode) => {
    response.statusCode = statusCode
    return response
  }
  response.json = (body) => {
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.end(JSON.stringify(body))
    return response
  }
}

async function readJsonBody(request, response) {
  let rawBody = ''
  for await (const chunk of request) {
    rawBody += chunk
    if (rawBody.length > 20_000) {
      response.status(413).json({ error: 'A solicitação é muito grande.' })
      return null
    }
  }
  try {
    return rawBody ? JSON.parse(rawBody) : {}
  } catch {
    return {}
  }
}

const server = createServer(async (request, response) => {
  addResponseHelpers(response)

  if (request.url === '/api/chat') {
    request.body = await readJsonBody(request, response)
    if (request.body === null) return
    await chatHandler(request, response)
    return
  }

  const requestedPath = decodeURIComponent(request.url?.split('?')[0] || '/')
  const relativePath = requestedPath === '/' ? 'index.html' : requestedPath.replace(/^\/+/, '')
  let filePath = normalize(join(distDirectory, relativePath))

  if (!filePath.startsWith(distDirectory)) {
    response.statusCode = 403
    response.end('Forbidden')
    return
  }

  try {
    const fileStats = await stat(filePath)
    if (fileStats.isDirectory()) filePath = join(filePath, 'index.html')
  } catch {
    filePath = join(distDirectory, 'index.html')
  }

  response.setHeader('Content-Type', contentTypes[extname(filePath)] || 'application/octet-stream')
  createReadStream(filePath).pipe(response)
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Aplicação disponível em http://localhost:${port}`)
})
