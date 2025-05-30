import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

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

const API_BASE_URL = 'http://localhost:3000';

export const api = {
  async getLinks(): Promise<GetLinksResponse> {
    const response = await fetch(`${API_BASE_URL}/links`);
    if (!response.ok) {
      throw new Error('Failed to fetch links');
    }
    return response.json();
  },
};

export const queryKeys = {
  links: ['links'] as const,
  originalLink: (id: string) => ['originalLink', id] as const,
};
