import React, { memo } from "react";
import TdGrade from "./tdGrade";

const SortIcon = ({ active, direction }) => {
  if (!active) {
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
        d={direction === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
      />
    </svg>
  );
};

const StudentTable = ({
  rows,
  sortConfig,
  onSort,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-xs uppercase text-slate-600">
          <tr>
            <th
              className="group w-16 cursor-pointer select-none border px-3 py-3 text-center transition hover:bg-slate-200"
              onClick={() => onSort && onSort("id")}
              title="Sắp xếp theo ID"
            >
              <div className="flex items-center justify-center gap-1">
                <span>STT</span>
                <SortIcon
                  active={sortConfig?.key === "id"}
                  direction={sortConfig?.direction}
                />
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
            rows.map((u) => {
              const profile = u.studentProfile || {};
              const isOfficial = profile.active === "CT"; 

              return (
                <tr key={u.id} className="transition hover:bg-slate-50">
                  <td className="border px-3 py-2 text-center text-slate-500">
                    {u.id}
                  </td>
                  <td className="border px-3 py-2 font-medium text-slate-700">
                    {profile.code}
                  </td>
                  <td className="border px-3 py-2">
                    <div className="font-semibold text-slate-800">
                      {u.username}
                    </div>
                    <div className="text-xs text-slate-500">
                      PH: {profile.fatherName || profile.motherName} -{" "}
                      {profile.fatherPhone || profile.motherPhone}
                    </div>
                  </td>
                  <TdGrade str={profile.grade} cssInput="text-center" />
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
                        onClick={() => onDelete(u.id)}
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