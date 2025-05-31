import { api } from './client'

export interface GenerateCsvLinksResponse {
  url: string
}

export async function generateCsvLinks(): Promise<GenerateCsvLinksResponse> {
  const response = await api.get('/generate-csv-links')

  return response.data
}