"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getLivros } from "@/lib/livros";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Pagination } from "@/components/Pagination";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  lido: boolean;
}

export default function ListaLivros() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await getLivros(page, 5);

        setLivros(response.data);
        setLastPage(response.meta.lastPage);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  return (
    <main className="p-6 flex flex-col items-center min-h-screen w-full">
      <div className="flex justify-between items-center w-1/2 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            ← Voltar
          </Button>
          Livros
        </h1>

        <Link href="/livros/novo">
          <Button>+ Novo Livro</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Carregando livros...</p>
      ) : (
        <>
          <ul className="space-y-4 w-1/2">
            {livros.length === 0 ? (
              <li className="text-muted-foreground">
                Nenhum livro encontrado.
              </li>
            ) : (
              livros.map((livro) => (
                <li
                  key={livro.id}
                  className="border p-4 rounded-md shadow flex justify-between items-center"
                >
                  <div>
                    <strong>{livro.titulo}</strong> - {livro.autor} ({livro.ano}
                    )
                    <span className="ml-3">
                      {livro.lido ? "✅ Lido" : "❌ Não lido"}
                    </span>
                  </div>

                  <Link
                    href={`/livros/${livro.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </Link>
                </li>
              ))
            )}
          </ul>
          <Pagination page={page} lastPage={lastPage} onPageChange={setPage} />
        </>
      )}

      <div className="fixed right-4 bottom-4">
        <ModeToggle />
      </div>
    </main>
  );
}
