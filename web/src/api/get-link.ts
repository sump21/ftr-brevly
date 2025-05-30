import { api } from './client'

export interface getLinkRequest {
  shortLink: string;
}

export interface getLinkResponse {
  id: string;
  originalLink: string;
  accessCount: number;
}

export async function getLink({ shortLink }:getLinkRequest ): Promise<getLinkResponse> {
  const response = await api.get(`/original-url/${shortLink}`)

  return response.data
}