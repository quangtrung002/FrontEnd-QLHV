import TdGrade from "services/tdGrade";

export default function FeedbackTable({ data, onInput, isLoading }) {
  if (isLoading)
    return (
      <div className="text-center py-10 text-slate-500">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full text-sm table-fixed">
        <thead className="bg-blue-500 text-xs text-white uppercase">
          <tr>
            <th className="border px-2 py-2 text-center w-12">STT</th>
            <th className="border px-2 py-2 text-left w-32">Mã định danh</th>
            <th className="border px-2 py-2 text-left w-48">Họ tên</th>
            <th className="border px-2 py-2 text-left w-[360px]">Phản hồi</th>
            <th className="border px-2 py-2 text-center w-20">Khối</th>
            <th className="border px-2 py-2 text-center w-28">Trạng thái</th>
            <th className="border px-2 py-2 text-center w-24">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-3 py-4 text-center text-slate-500">
                Không có dữ liệu phù hợp.
              </td>
            </tr>
          ) : (
            data.map((fb, idx) => {
              const { student, feedback } = fb;

              return (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="border px-2 py-2 text-center text-slate-500 w-12">
                    {idx + 1}
                  </td>

                  <td className="border px-2 py-2 font-mono text-xs text-left w-32 truncate">
                    {student.code}
                  </td>

                  <td className="border px-2 py-2 text-left w-48 truncate">
                    {student.username}
                  </td>

                  <td className="border px-2 py-2 text-left w-[360px]">
                    <div className="line-clamp-1 break-words">
                      {feedback.content}
                    </div>
                  </td>

                  <TdGrade str={student.grade} cssInput="text-center w-20" />

                  <td className="border px-2 py-2 text-center w-28">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        feedback?.content
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-400 text-white"
                      }`}
                    >
                      {feedback?.content ? "Đã nhập" : "Chưa nhập"}
                    </span>
                  </td>

                  <td className="border px-2 py-2 text-center w-24">
                    <button
                      onClick={() => onInput(fb)}
                      className="rounded bg-blue-500 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-600"
                    >
                      Nhập
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
