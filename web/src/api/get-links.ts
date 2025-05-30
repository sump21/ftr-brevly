import { api } from './client'

export interface Link {
  id: string;
  originalLink: string;
  shortLink: string;
  accessCount: number;
  createdAt: string;
}

export interface GetLinksResponse {
  links: Link[];
}

export async function getLinks(): Promise<GetLinksResponse> {
  const response = await api.get('/links')

  return response.data
}