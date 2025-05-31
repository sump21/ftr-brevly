import { api } from './client'

interface IncrementCountLinkRequest {
  id: string
}

export async function incrementCountLink({ id }: IncrementCountLinkRequest) {
  const response = await api.patch('/increment-access-count-link', {
    id
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response
}
