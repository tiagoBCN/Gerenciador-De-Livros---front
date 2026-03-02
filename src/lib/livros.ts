import { api } from "./api";


export async function getLivros(page: number = 1, limit: number = 5) {
  const response = await api.get("/api/livros", {
    params: { page, limit },
  });

  return response.data;
}

export async function getLivro(id: string | number) {
  const response = await api.get(`/api/livros/${id}`);
  return response.data;
}

export async function criarLivro(data: any) {
  const response = await api.post("/api/livros", data);
  return response.data;
}

export async function atualizarLivro(id: string | number, data: any) {
  const response = await api.put(`/api/livros/${id}`, data);
  return response.data;
}

export async function excluirLivro(id: string | number) {
  const response = await api.delete(`/api/livros/${id}`);
  return response.data;
}
