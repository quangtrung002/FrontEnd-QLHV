import React from "react";
import TdGrade from "services/tdGrade";

export default function StudentTable({
  rows,
  startIndex = 0,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="border-b px-3 py-2 text-left">STT</th>
            <th className="border-b px-3 py-2 text-left">Mã định danh</th>
            <th className="border-b px-3 py-2 text-left">Họ tên học viên</th>
            <th className="border-b px-3 py-2 text-left">Khối</th>
            <th className="border-b px-3 py-2 text-left">Ngày sinh</th>
            <th className="border-b px-3 py-2 text-left">Họ và tên bố</th>
            <th className="border-b px-3 py-2 text-left">Họ và tên mẹ</th>
            <th className="border-b px-3 py-2 text-left">Trạng thái</th>
            <th className="border-b px-3 py-2 text-left">Active</th>
            <th className="border-b px-3 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={10}
                className="px-3 py-4 text-center text-slate-500"
              >
                Không có học viên nào phù hợp.
              </td>
            </tr>
          ) : (
            rows.map((u, idx) => (
              <tr key={u.id} className="transition-colors hover:bg-slate-50">
                <td className="border-b px-3 py-2">{startIndex + idx + 1}</td>
                <td className="border-b px-3 py-2 font-mono text-xs">
                  {u.code}
                </td>
                <td className="border-b px-3 py-2">{u.fullName}</td>
                <TdGrade str={u.grade} />
                <td className="border-b px-3 py-2">{u.dob}</td>
                <td className="border-b px-3 py-2">{u.fatherName}</td>
                <td className="border-b px-3 py-2">{u.motherName}</td>
                <td className="border-b px-3 py-2">
                  <span
                    className={
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium " +
                      (String(u.status || "")
                        .toLowerCase()
                        .includes("chính thức")
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700")
                    }
                  >
                    {u.status}
                  </span>
                </td>
                <td className="border-b px-3 py-2">
                  <span
                    className={
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium " +
                      (String(u.active || "").toLowerCase() === "active"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-200 text-slate-700")
                    }
                  >
                    {u.active}
                  </span>
                </td>
                <td className="border-b px-3 py-2">
                  <div className="flex items-center gap-2">
                    {onView && (
                      <button
                        type="button"
                        onClick={() => onView(u)}
                        className="rounded p-1 hover:bg-slate-100"
                        title="Xem chi tiết"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-sky-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path d="M2.25 12s2.25-6.75 9.75-6.75S21.75 12 21.75 12 19.5 18.75 12 18.75 2.25 12 2.25 12Z" />
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                      </button>
                    )}
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(u)}
                        className="rounded p-1 hover:bg-slate-100"
                        title="Sửa"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-amber-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path d="M16.862 4.487 19.5 7.125m-2.638-2.638-8.508 8.508a4.5 4.5 0 0 0-1.2 2.164L6 18l2.841-.154a4.5 4.5 0 0 0 2.164-1.2l8.508-8.508-2.651-2.651Z" />
                          <path d="M19.5 14.25V19.5A1.5 1.5 0 0 1 18 21H4.5A1.5 1.5 0 0 1 3 19.5V6A1.5 1.5 0 0 1 4.5 4.5H9.75" />
                        </svg>
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(u)}
                        className="rounded p-1 hover:bg-slate-100"
                        title="Xóa"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-red-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path d="M6 7.5h12" />
                          <path d="M9.75 4.5h4.5L15 6H9l.75-1.5Z" />
                          <path d="M8.25 7.5 9 19.5h6l.75-12" />
                        </svg>
                      </button>
                    )}
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
