import { api } from './client'

interface AddLinkRequest {
  originalLink: string
  shortLink: string
}

export async function addLinks({originalLink, shortLink}: AddLinkRequest) {
  const response = await api.post('/add-link', {
    originalLink,
    shortLink
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response
}