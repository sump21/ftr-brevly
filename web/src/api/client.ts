import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000'
})


// export interface Link {
//   id: string;
//   originalLink: string;
//   shortLink: string;
//   accessCount: number;
//   createdAt: string;
// }

// export interface GetLinksResponse {
//   links: Link[];
// }

// export interface AddLinkRequest {
//   originalLink: string;
//   shortLink: string;
// }

// const API_BASE_URL = 

// export const api = {
//   async getLinks(): Promise<GetLinksResponse> {
//     const response = await fetch(`${API_BASE_URL}/links`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch links');
//     }
//     return response.json();
//   },

//   async addLink(data: AddLinkRequest): Promise<void> {
//     const response = await fetch(`${API_BASE_URL}/add-link`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
    
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error || 'Failed to create link');
//     }
//   },
// };

// export const queryKeys = {
//   links: ['links'] as const,
//   originalLink: (id: string) => ['originalLink', id] as const,
// };
