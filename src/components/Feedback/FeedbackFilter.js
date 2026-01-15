import React from "react";
import { GRADE } from "services/tdGrade";

export default function FeedbackFilter({
  week,
  grade,
  status,
  onChange,
  onApply,
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end gap-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Tuần</label>
        <select
          value={week}
          onChange={(e) => onChange("week", +e.target.value)}
          className="h-10 rounded-lg border text-sm px-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {[1, 2, 3, 4, 5].map((w) => (
            <option key={w} value={w}>
              Tuần {w}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Lọc Khối</label>
        <select
          value={grade}
          onChange={(e) => onChange("grade", e.target.value)}
          className="h-10 min-w-[100px] text-sm rounded-lg border px-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Tất cả</option>
          {GRADE.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Trạng thái</label>
        <select
          value={status}
          onChange={(e) => onChange("status", e.target.value)}
          className="h-10 min-w-[120px] text-sm rounded-lg border px-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Tất cả</option>
          <option value="done">Đã nhập</option>
          <option value="pending">Chưa nhập</option>
        </select>
      </div>

      <button
        onClick={onApply}
        className="h-10 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700 transition"
      >
        Xác nhận
      </button>
    </div>
  );
}
