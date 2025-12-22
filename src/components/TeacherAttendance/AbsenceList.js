import React from "react";

export default function AbsenceList({ absences, teachers, onDelete }) {
  console.log("absences inside list", absences)
  const getTeacherName = (id) => {
    const teacher = teachers.find((t) => String(t.id) === String(id));
    return teacher ? teacher.fullName : `ID: ${id}`;
  };

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
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="border px-4 py-2">Ngày</th>
                <th className="border px-4 py-2">Giáo viên</th>
                <th className="border px-4 py-2">Lý do</th>
                <th className="w-20 border px-4 py-2 text-center">Xóa</th>
              </tr>
            </thead>
            <tbody>
              {absences.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="border px-4 py-2 font-medium text-slate-900">
                    {item.date ? item.date.split("-").reverse().join("/") : ""}
                  </td>
                  <td className="border px-4 py-2 text-slate-700">
                    {getTeacherName(item.teacherId)}
                  </td>
                  <td className="border px-4 py-2 text-slate-600">
                    {item.reason}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="px-2 font-bold text-red-500 hover:text-red-700"
                    >
                      ✕
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
