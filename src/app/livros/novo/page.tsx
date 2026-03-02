"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { criarLivro } from "@/lib/livros";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";

export default function NovoLivro() {
  const router = useRouter();
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    ano: "",
    lido: false,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await criarLivro({ ...form, ano: Number(form.ano) });
    router.push("/livros");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Novo Livro</h1>

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

      <div className="flex space-x-3">
        <Button type="submit">Salvar</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>

      <div className="fixed right-4 bottom-4">
        <ModeToggle />
      </div>
    </form>
  );
}
