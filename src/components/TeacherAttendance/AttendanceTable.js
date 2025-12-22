import React from "react";

export default function AttendanceTable({
  teachers,
  days,
  daysInMonth,
  schedule,
  totalsByTeacher,
  onToggleCell,
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-300 bg-white shadow-sm">
      <table className="w-full min-w-max border-collapse text-xs">
        <thead>
          <tr>
            <th className="sticky left-0 z-40 w-[150px] min-w-[150px] border bg-slate-100 p-2 text-left font-bold text-slate-700">
              Giáo viên
            </th>
            <th className="sticky left-[150px] z-40 w-[140px] min-w-[140px] border bg-slate-100 p-2 text-left font-bold text-slate-700">
              Ca dạy
            </th>
            {days.map(({ day, weekday }) => (
              <th
                key={day}
                className={`min-w-[36px] border p-1 text-center font-medium ${
                  weekday === "CN"
                    ? "bg-red-50 text-red-600"
                    : "bg-slate-50 text-slate-600"
                }`}
              >
                <div>{day}</div>
                <div className="text-[10px] opacity-70">{weekday}</div>
              </th>
            ))}
            <th className="sticky right-0 z-40 w-16 border bg-slate-100 p-2 text-center font-bold text-slate-700">
              Tổng
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => {
            const teacherShifts = t.shifts || [];
            const rowSpan = Math.max(teacherShifts.length, 1);
            const rows = schedule[t.id];

            if (!teacherShifts.length) {
              return (
                <tr key={t.id} className="border-b">
                  <td className="sticky left-0 z-30 w-[150px] min-w-[150px] border bg-white p-2 font-semibold text-slate-700">
                    {t.fullName}
                  </td>
                  <td className="sticky left-[150px] z-30 w-[140px] min-w-[140px] border bg-slate-50 p-2 text-center text-slate-400 italic">
                    Chưa đăng ký ca
                  </td>
                  <td
                    colSpan={daysInMonth + 1}
                    className="p-2 text-center text-slate-400 italic"
                  ></td>
                </tr>
              );
            }

            return teacherShifts.map((shift, sIdx) => (
              <tr
                key={`${t.id}-${sIdx}`}
                className="border-b hover:bg-slate-50"
              >
                {sIdx === 0 && (
                  <td
                    rowSpan={rowSpan}
                    className="sticky left-0 z-30 w-[150px] min-w-[150px] border-r border-b bg-white p-2 align-middle font-semibold text-slate-700"
                  >
                    {t.fullName}
                  </td>
                )}

                <td className="sticky left-[150px] z-20 w-[140px] min-w-[140px] border-r bg-slate-50 p-2 text-[10px] font-medium text-slate-600">
                  {shift}
                </td>

                {days.map((_, dIdx) => {
                  const isChecked = rows && rows[sIdx] && rows[sIdx][dIdx];
                  return (
                    <td
                      key={dIdx}
                      onClick={() => onToggleCell(t.id, sIdx, dIdx)}
                      className="cursor-pointer border text-center transition-colors hover:bg-blue-50"
                    >
                      {isChecked && (
                        <div className="mx-auto h-5 w-5 rounded-sm bg-blue-500 shadow-sm" />
                      )}
                    </td>
                  );
                })}

                {sIdx === 0 && (
                  <td
                    rowSpan={rowSpan}
                    className="sticky right-0 z-30 border-l border-b bg-white p-2 text-center font-bold text-blue-600"
                  >
                    {totalsByTeacher[t.id] || 0}
                  </td>
                )}
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}
