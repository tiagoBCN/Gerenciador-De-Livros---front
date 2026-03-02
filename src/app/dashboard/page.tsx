"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLivros } from "@/lib/livros";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GraficoLivros from "@/components/graficosLivros";
import { ModeToggle } from "@/components/mode-toggle";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: number;
  name: string;
  exp: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [lidos, setLidos] = useState(0);
  const [naoLidos, setNaoLidos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      setUserName(decoded.name);
    } catch {
      router.push("/login");
      return;
    }

    async function fetchDados() {
      try {
        const response = await getLivros(1, 1000);
        const livros = response.data;

        setTotal(livros.length);
        const lidosCount = livros.filter((livro: any) => livro.lido).length;

        setLidos(lidosCount);
        setNaoLidos(livros.length - lidosCount);
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchDados();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Olá, {userName}</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de livros
          </p>
        </div>

        <Button variant="destructive" onClick={handleLogout}>
          Sair
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Livros</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{loading ? "..." : total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Livros Lidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{loading ? "..." : lidos}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Livros Não Lidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {loading ? "..." : naoLidos}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pt-6">
        <div className="flex-1 space-x-2">
          <Button onClick={() => router.push("/livros")}>Ver Livros</Button>

          <Button onClick={() => router.push("/livros/novo")} variant="outline">
            Adicionar Novo Livro
          </Button>
        </div>

        {total != 0 && (
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Status dos Livros</h2>
            <GraficoLivros />
          </div>
        )}
      </div>

      <div className="fixed right-4 bottom-4">
        <ModeToggle />
      </div>
    </div>
  );
}
