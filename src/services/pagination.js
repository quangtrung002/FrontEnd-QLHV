import React from "react";

export default function Pagination({
  totalItems,
  itemsPerPage = 15,
  currentPage,
  onPageChange,
  itemLabel = "bản ghi", // vd: "học viên"
}) {
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const startIndex =
    totalItems === 0 ? 0 : (safePage - 1) * itemsPerPage + 1;
  const endIndex =
    totalItems === 0
      ? 0
      : Math.min(safePage * itemsPerPage, totalItems);

  const handlePrev = () => {
    if (safePage > 1) onPageChange(safePage - 1);
  };

  const handleNext = () => {
    if (safePage < totalPages) onPageChange(safePage + 1);
  };

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700">
      <span>
        Hiển thị{" "}
        {startIndex === 0 ? 0 : `${startIndex}–${endIndex}`} /{" "}
        {totalItems} {itemLabel}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={safePage === 1}
          className="px-3 py-1 rounded border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
        >
          Trước
        </button>
        <span>
          Trang {safePage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={safePage === totalPages}
          className="px-3 py-1 rounded border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
