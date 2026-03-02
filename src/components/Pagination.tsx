"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  lastPage,
  onPageChange,
}: PaginationProps) {
  if (lastPage <= 1) return null;

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < lastPage) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={handlePrevious}
      >
        ← Anterior
      </Button>

      <span className="text-sm font-medium">
        Página {page} de {lastPage}
      </span>

      <Button
        variant="outline"
        disabled={page === lastPage}
        onClick={handleNext}
      >
        Próxima →
      </Button>
    </div>
  );
}