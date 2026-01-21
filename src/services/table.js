import React, { memo } from "react";
import TdGrade from "./tdGrade";

const SortIcon = ({isSort}) => {
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
        d={isSort ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
      />
    </svg>
  );
};

const StudentTable = ({ rows, isSort, onSort, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-xs uppercase text-slate-600">
          <tr className="bg-blue-500 text-white text-xs uppercase">
            <th
              className="group w-16 cursor-pointer select-none border px-3 py-3 text-center transition hover:bg-slate-200"
              onClick={onSort}
              title="Sắp xếp theo ID"
            >
              <div className="flex items-center justify-center gap-1">
                <span>STT</span>
                <SortIcon isSort={isSort} />
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
              <td colSpan={6} className="px-3 py-4 text-center text-slate-500">
                Không tìm thấy dữ liệu.
              </td>
            </tr>
          ) : (
            rows.map((u, idx) => {
              const isOfficial = u.status === "CT";

              return (
                <tr key={u.enrollmentId} className="transition hover:bg-slate-50">
                  <td className="border px-3 py-2 text-center text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="border px-3 py-2 font-medium text-slate-700">
                    {u.code}
                  </td>
                  <td className="border px-3 py-2">
                    <div className="font-semibold text-slate-800">
                      {u.username}
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
                        isOfficial
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {isOfficial ? "Chính thức" : "Trải nghiệm"}
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
                        onClick={() => onDelete(u.enrollmentId)}
                        className="rounded bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-200"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default memo(StudentTable);
