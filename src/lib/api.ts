const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL não definida");
}

function getAuthHeaders() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function handleResponse(res: Response) {
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    throw new Error("Não autorizado");
  }

  return res.json();
}

export async function getLivros() {
  const res = await fetch(`${BASE_URL}/api/livros`, {
    cache: "no-store",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}

export async function getLivro(id: string | number) {
  const res = await fetch(`${BASE_URL}/api/livros/${id}`, {
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}

export async function criarLivro(data: any) {
  const res = await fetch(`${BASE_URL}/api/livros`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function atualizarLivro(id: string | number, data: any) {
  const res = await fetch(`${BASE_URL}/api/livros/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function excluirLivro(id: string | number) {
  const res = await fetch(`${BASE_URL}/api/livros/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}