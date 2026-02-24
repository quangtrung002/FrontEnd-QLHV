import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putAttandance } from "apis/teacher.api";
import {
  notificationError,
  notificationSuccess,
} from "notification/notification";
import React from "react";

export default function AttendanceTable({
  teachers,
  days,
  daysInMonth,
  schedules = [],
  month,
  year,
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: putAttendanceMutation } = useMutation({
    mutationFn: putAttandance,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Cập nhật điểm danh thành công!");
        queryClient.invalidateQueries(["absence-teachers", month, year]);
      }
    },
    onError: (res) => {
      notificationError(res.msg);
    },
  });
  const hasAttendance = (teacherId, shiftName, day) => {
    return schedules.some(
      (s) =>
        s.teacherId === teacherId &&
        s.shiftName === shiftName &&
        s.days.includes(day),
    );
  };
  const totalDayByTeacher = (teacherId) => {
    let total = 0;
    schedules.forEach((schedule) => {
      if (schedule.teacherId === teacherId) total += schedule.days.length;
    });
    return total;
  };

  const onToggleCell = async (teacherId, shiftName, day) => {
    await putAttendanceMutation({
      teacherId,
      month,
      year,
      shiftName,
      days: [day],
    });
  };
  
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
                  weekday === "CN" || weekday === "T7"
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
            // const rows = schedules[t.id];

            if (!teacherShifts.length) {
              return (
                <tr key={t.id} className="border-b">
                  <td className="sticky left-0 z-30 w-[150px] min-w-[150px] border bg-white p-2 font-semibold text-slate-700">
                    {t.username}
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
                    {t.username}
                  </td>
                )}

                <td className="sticky left-[150px] z-20 w-[140px] min-w-[140px] border-r bg-slate-50 p-2 text-[10px] font-medium text-slate-600">
                  {shift}
                </td>

                {days.map((_, dIdx) => {
                  const isChecked = hasAttendance(t.id, shift, +days[dIdx].day);
                  return (
                    <td
                      key={dIdx}
                      onClick={() => onToggleCell(t.id, shift, +days[dIdx].day)}
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
                    {totalDayByTeacher(t.id) || 0}
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
