import React from "react";

export default function AbsenceList({ absences, onDelete }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 border-b pb-2 text-lg font-bold text-slate-800">
        Danh sách báo nghỉ
      </h2>

      {absences.length === 0 ? (
        <p className="text-sm italic text-slate-500">
          Chưa có dữ liệu nghỉ trong tháng này.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="w-[120px] border px-4 py-2">Ngày</th>
                <th className="w-[200px] border px-4 py-2">Giáo viên</th>
                <th className="w-[300px] border px-4 py-2">Lý do</th>
                <th className="w-[80px] border px-4 py-2 text-center">Xóa</th>
              </tr>
            </thead>

            <tbody>
              {absences.map((item) => (
                <tr key={item.leaveId} className="hover:bg-slate-50">
                  <td className="border px-4 py-2 font-medium text-slate-900">
                    {item.date ? item.date.split("-").reverse().join("/") : ""}
                  </td>

                  <td className="border px-4 py-2 text-slate-700 truncate">
                    {item.teacherName}
                  </td>

                  <td className="border px-4 py-2 text-slate-600 truncate">
                    {item.reason}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => onDelete(item.leaveId)}
                      className="px-2 font-bold text-red-500 hover:text-red-700"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
