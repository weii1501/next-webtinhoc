import { useEffect, useState } from 'react'
import { DJANGO_BASE_WS } from '@/constants'

export default function useWebSocket (url) {
  const [message, setMessage] = useState([])
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const ws = new WebSocket(`${DJANGO_BASE_WS}/api/${url}`)

    ws.onopen = () => {
      console.log('WebSocket connection established')
      setSocket(ws)
    }

    ws.onmessage = (event) => {
      console.log('ssssssssss', message, JSON.parse(event.data))
      setMessage([...message, JSON.parse(event.data)])
    }

    ws.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      ws.close()
    }
  }, [url])

  const sendMessage = (message) => {
    if (socket) {
      socket.send(JSON.stringify(message))
    }
  }

  return { message, sendMessage, setMessage }
}
