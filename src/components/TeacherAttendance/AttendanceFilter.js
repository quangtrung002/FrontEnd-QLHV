import React from "react";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "./data";

export default function AttendanceFilter({
  month,
  year,
  onMonthChange,
  onYearChange,
  onOpenModal,
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex gap-4">
        <div>
          <label className="mb-1 block text-sm font-semibold">Tháng</label>
          <select
            value={month}
            onChange={(e) => onMonthChange(Number(e.target.value))}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {MONTH_OPTIONS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Năm</label>
          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onOpenModal}
        className="h-10 rounded-lg bg-green-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
      >
        + Thêm lý do nghỉ
      </button>
    </div>
  );
}