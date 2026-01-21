import TdGrade from "services/tdGrade";
import { renderSortIcon } from "services/render_icon";

export default function LeaveTable({ pageLeaves, onDelete, onSort, isSort }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr className="bg-blue-500 text-white text-xs uppercase">
            <th
              className="border px-3 py-2 text-center w-16 cursor-pointer select-none"
              onClick={onSort}
            >
              <div className="flex items-center justify-center gap-1">
                <span>STT</span>
                {renderSortIcon(isSort)}
              </div>
            </th>
            <th className="border px-3 py-2 text-left">Họ tên học viên</th>
            <th className="border px-3 py-2 text-center">Khối</th>
            <th className="border px-3 py-2 text-center">Ngày nghỉ</th>
            <th className="border px-3 py-2 text-left">Lý do nghỉ</th>
            <th className="border px-3 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {pageLeaves.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-3 py-4 text-center text-slate-500">
                Chưa có dữ liệu ngày nghỉ.
              </td>
            </tr>
          ) : (
            pageLeaves.map((l, idx) => (
              <tr key={l.id} className="hover:bg-slate-50">
                <td className="border px-3 py-2 text-center text-slate-500">
                  {idx + 1}
                </td>
                <td className="border px-3 py-2">{l.student_username}</td>
                <TdGrade str={l.grade} cssInput="text-center" />
                <td className="border px-3 py-2 text-center">
                  {l.date.split("T")[0]}
                </td>
                <td className="border px-3 py-2">{l.reason}</td>
                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() => onDelete(l)}
                    className="p-1 rounded hover:bg-slate-100"
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
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
