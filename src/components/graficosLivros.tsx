"use client";

import { useEffect, useState } from "react";
import { getLivros } from "@/lib/api";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4ade80", "#f87171"]; // verde e vermelho

export default function GraficoLivros() {
  const [data, setData] = useState([
    { name: "Lidos", value: 0 },
    { name: "Não Lidos", value: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const livros = await getLivros();
      const lidos = livros.filter((livro: any) => livro.lido).length;
      const naoLidos = livros.length - lidos;

      setData([
        { name: "Lidos", value: lidos },
        { name: "Não Lidos", value: naoLidos },
      ]);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p>Carregando gráfico...</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label={({ name, percent }) =>
            `${name}: ${(percent! * 100).toFixed(0)}%`
          }
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}