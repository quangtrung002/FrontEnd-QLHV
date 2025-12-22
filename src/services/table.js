import React from "react";
import TdGrade from "./tdGrade";

export default function StudentTable({
  rows,
  startIndex,
  sortConfig,
  onSort,
  onView,
  onEdit,
  onDelete,
}) {
  // Hàm render icon mũi tên
  const renderSortIcon = () => {
    if (!sortConfig || sortConfig.key !== "id") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-slate-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }
    if (sortConfig.direction === "asc") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-xs uppercase text-slate-600">
          <tr>
            <th
              className="border px-3 py-3 text-center w-16 cursor-pointer hover:bg-slate-200 transition select-none group"
              onClick={() => onSort && onSort("id")}
              title="Sắp xếp theo ID"
            >
              <div className="flex items-center justify-center gap-1">
                <span>STT</span>
                {renderSortIcon()}
              </div>
            </th>
            <th className="border px-3 py-3 text-left">Mã định danh</th>
            <th className="border px-3 py-3 text-left">Họ và tên</th>
            <th className="border px-3 py-3 text-center">Khối</th>
            <th className="border px-3 py-3 text-center">Trạng thái</th>
            <th className="border px-3 py-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-3 py-4 text-center text-slate-500">
                Không tìm thấy dữ liệu.
              </td>
            </tr>
          ) : (
            rows.map((u, i) => (
              <tr key={u.id} className="hover:bg-slate-50 transition">
                <td className="border px-3 py-2 text-center text-slate-500">
                  {u.id}
                </td>
                <td className="border px-3 py-2 font-medium text-slate-700">
                  {u.code}
                </td>
                <td className="border px-3 py-2">
                  <div className="font-semibold text-slate-800">
                    {u.fullName}
                  </div>
                  <div className="text-xs text-slate-500">
                    PH: {u.fatherName || u.motherName} -{" "}
                    {u.fatherPhone || u.motherPhone}
                  </div>
                </td>
                <TdGrade str={u.grade} cssInput="text-center" />
                <td className="border px-3 py-2 text-center">
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                      u.status === "chính thức" || u.status === "Chính thức"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="border px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onView(u)}
                      className="rounded bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-600 hover:bg-sky-200"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => onEdit(u)}
                      className="rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-600 hover:bg-amber-200"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(u)}
                      className="rounded bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-200"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
