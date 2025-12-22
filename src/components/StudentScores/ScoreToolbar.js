import React from "react";

export default function ScoreToolbar({
  termControl,
  setTermControl,
  onApply,
  filterGrade,
  setFilterGrade,
  uniqueGrades,
  contextTerm,
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-sm">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Học kì:</span>
          <select
            value={termControl}
            onChange={(e) => setTermControl(e.target.value)}
            className="h-9 rounded-lg border border-slate-300 bg-white px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="1_2025_2026">1_2025_2026</option>
            <option value="2_2025_2026">2_2025_2026</option>
            <option value="1_2026_2027">1_2026_2027</option>
            <option value="2_2026_2027">2_2026_2027</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onApply}
          className="inline-flex items-center gap-1 h-9 rounded-lg bg-red-600 px-4 text-xs font-semibold text-white hover:bg-blue-700 transition"
        >
          Xác nhận
        </button>

        <div className="ml-2 flex items-center gap-2 pl-4 border-l border-slate-300">
          <span className="font-semibold">Lọc:</span>
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="h-9 min-w-[100px] rounded-lg border border-slate-300 bg-white px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Tất cả</option>
            {uniqueGrades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-slate-600">
        Đang xem: <span className="font-semibold">Học kì {contextTerm}</span>
      </div>
    </div>
  );
}
