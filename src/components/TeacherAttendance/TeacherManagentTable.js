import Pagination from "services/pagination";

const ITEMS_PER_PAGE = 10;

export default function TeacherManagementTable({
  teachers,
  page,
  onPageChange,
  onEdit,
  onDelete,
}) {
  const totalItems = teachers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(page, 1), totalPages || 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageTeachers = teachers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="animate-fade-in">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 uppercase">
            <tr className="bg-blue-500 text-white text-xs">
              <th className="border px-4 py-3 text-center w-16">STT</th>
              <th className="border px-4 py-3 text-left w-48">Họ và tên</th>
              <th className="border px-4 py-3 text-center w-32">Liên hệ</th>
              <th className="border px-4 py-3 text-left">Ca dạy cố định</th>
              <th className="border px-4 py-3 text-center w-32">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {pageTeachers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  Không tìm thấy giáo viên nào.
                </td>
              </tr>
            ) : (
              pageTeachers.map((t, idx) => (
                <tr key={t.id} className="hover:bg-slate-50 transition">
                  <td className="border px-4 py-3 text-center font-mono text-xs text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="border px-4 py-3 font-semibold text-slate-700">
                    {t.username}
                  </td>
                  <td className="border px-4 py-3 text-slate-600">
                    <div className="text-xs text-center">{t.phone}</div>
                    <div className="text-[10px] text-slate-400">{t.email}</div>
                  </td>
                  <td className="border px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {t.shifts && t.shifts.length > 0 ? (
                        t.shifts.map((shift, idx) => (
                          <span
                            key={idx}
                            className="inline-block rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 border border-blue-100"
                          >
                            {shift}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs italic text-slate-400">
                          Chưa đăng ký ca
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="border px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(t)}
                        className="rounded bg-amber-100 p-1.5 text-amber-600 transition hover:bg-amber-200"
                        title="Sửa thông tin"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.313l-4.5 1.125 1.125-4.5L16.862 3.487z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => onDelete(t.id)}
                        className="rounded bg-rose-100 p-1.5 text-rose-600 transition hover:bg-rose-200"
                        title="Xóa giáo viên"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-7 4v6m4-6v6m4-6v6M5 7l1 14a2 2 0 002 2h8a2 2 0 002-2l1-14"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={onPageChange}
        itemLabel="giáo viên"
      />
    </div>
  );
}
