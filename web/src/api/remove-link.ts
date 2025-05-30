import { api } from './client'

interface RemoveLinkRequest {
  id: string
}

export async function removeLinks({id}: RemoveLinkRequest) {
  const response = await api.delete('/remove-link', {
    data: { id },
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response
}