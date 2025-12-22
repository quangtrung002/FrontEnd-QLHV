export default function FeedbackTable({ 
  data, 
  onInput, 
  startIndex = 0,
  sortConfig, 
  onSort 
}) {

  const renderSortIcon = () => {
    if (!sortConfig || sortConfig.key !== "userId") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    if (sortConfig.direction === "asc") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th 
              className="border px-3 py-2 text-center w-16 cursor-pointer hover:bg-slate-200 transition select-none group"
              onClick={() => onSort && onSort("userId")}
              title="Sắp xếp theo ID"
            >
              <div className="flex items-center justify-center gap-1">
                <span>STT</span>
                {renderSortIcon()}
              </div>
            </th>
            <th className="border px-3 py-2 text-left">Mã định danh</th>
            <th className="border px-3 py-2 text-left">Họ tên</th>
            <th className="border px-3 py-2 text-left">Phản hồi</th>
            <th className="border px-3 py-2 text-left">Người phụ trách</th>
            <th className="border px-3 py-2 text-center">Trạng thái</th>
            <th className="border px-3 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
             <tr>
               <td colSpan={7} className="px-3 py-4 text-center text-slate-500">
                 Không tìm thấy dữ liệu.
               </td>
             </tr>
          ) : (
            data.map((f, i) => (
              <tr key={f.userId} className="hover:bg-slate-50">
                <td className="border px-3 py-2 text-center text-slate-500">
                  {f.userId}
                </td>
                <td className="border px-3 py-2 font-mono text-xs text-left">{f.code}</td>
                <td className="border px-3 py-2 text-left">{f.fullName}</td>
                <td className="border px-3 py-2 text-left">
                  {f.shortContent || ""}
                </td>
                <td className="border px-3 py-2 text-left">{f.assignedTeacher}</td>
                <td className="border px-3 py-2 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      f.status === "done"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-400 text-white"
                    }`}
                  >
                    {f.status === "done" ? "Đã nhập" : "Chưa nhập"}
                  </span>
                </td>
                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() => onInput(f)}
                    className="rounded bg-blue-500 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-600"
                  >
                    Nhập
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