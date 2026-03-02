"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { atualizarLivro, excluirLivro, getLivro } from "@/lib/livros";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditarLivro() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    ano: "",
    lido: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLivro() {
      const data = await getLivro(id as string);
      setForm({ ...data, ano: data.ano.toString() });
      setLoading(false);
    }
    fetchLivro();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    await atualizarLivro(id as string, { ...form, ano: Number(form.ano) });
    router.push("/livros");
  }

  async function handleDelete() {
    const ok = confirm("Tem certeza que deseja excluir?");
    if (!ok) return;
    await excluirLivro(id as string);
    router.push("/livros");
  }

  if (loading) return <p className="p-6">Carregando...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Editar Livro</h1>

      <Input
        placeholder="Título"
        value={form.titulo}
        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
      />

      <Input
        placeholder="Autor"
        value={form.autor}
        onChange={(e) => setForm({ ...form, autor: e.target.value })}
      />

      <Input
        placeholder="Ano"
        type="number"
        value={form.ano}
        onChange={(e) => setForm({ ...form, ano: e.target.value })}
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={form.lido}
          onChange={(e) => setForm({ ...form, lido: e.target.checked })}
        />
        <span>Já foi lido</span>
      </label>

      <div className="flex gap-4">
        <Button type="submit">Salvar</Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>
          Excluir
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    </form>
  );
}
