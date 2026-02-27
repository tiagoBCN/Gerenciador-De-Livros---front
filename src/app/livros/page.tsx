"use client";

import Link from "next/link";
import { getLivros } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ListaLivros() {
  const [livros, setLivros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLivros();
        setLivros(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="p-6 flex flex-col items-center justify-center min-h-screen w-full">
      <div className="flex justify-between items-center w-1/2 mb-4">
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
        <p className="mt-6 text-muted-foreground">Carregando livros...</p>
      ) : (
        <ul className="mt-6 space-y-4 w-1/2">
          {livros.length === 0 ? (
            <li className="text-muted-foreground">Nenhum livro encontrado.</li>
          ) : (
            livros.map((livro) => (
              <li
                key={livro.id}
                className="border p-4 rounded-md shadow flex justify-between items-center"
              >
                <div>
                  <strong>{livro.titulo}</strong> - {livro.autor} ({livro.ano})
                  <span className="ml-3">{livro.lido ? "✅ Lido" : "❌ Não lido"}</span>
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
      )}

      <div className="fixed right-4 bottom-4">
        <ModeToggle />
      </div>
    </main>
  );
}