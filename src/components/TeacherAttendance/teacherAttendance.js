import React, { useEffect, useMemo, useState } from "react";
import { cn } from "services/utils";
const TEACHERS = [
  {
    id: "giap",
    name: "Thầy Giáp",
    shifts: ["18:15 - 19:45", "20:00 - 21:30"],
  },
  {
    id: "tung",
    name: "Thầy Tùng",
    shifts: ["08:00 - 11:15", "18:15 - 19:45", "20:00 - 21:30"],
  },
  {
    id: "trung",
    name: "Thầy Trung",
    shifts: ["18:15 - 19:45", "20:00 - 21:30"],
  },
];

function createEmptySchedule(numDays) {
  const schedule = {};
  TEACHERS.forEach((t) => {
    schedule[t.id] = t.shifts.map(() => Array(numDays).fill(false));
  });
  return schedule;
}

const WEEKDAY_LABELS = ["CN", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7"];

const MONTH_OPTIONS = [
  { value: 1, label: "Tháng 1" },
  { value: 2, label: "Tháng 2" },
  { value: 3, label: "Tháng 3" },
  { value: 4, label: "Tháng 4" },
  { value: 5, label: "Tháng 5" },
  { value: 6, label: "Tháng 6" },
  { value: 7, label: "Tháng 7" },
  { value: 8, label: "Tháng 8" },
  { value: 9, label: "Tháng 9" },
  { value: 10, label: "Tháng 10" },
  { value: 11, label: "Tháng 11" },
  { value: 12, label: "Tháng 12" },
];

const YEAR_OPTIONS = [2024, 2025, 2026, 2027];

export default function TeacherAttendance() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = useMemo(
    () => new Date(year, month, 0).getDate(),
    [month, year]
  );

  const days = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const d = new Date(year, month - 1, day);
      const weekday = WEEKDAY_LABELS[d.getDay()];
      return { day, weekday };
    });
  }, [daysInMonth, month, year]);

  const [schedule, setSchedule] = useState(() =>
    createEmptySchedule(daysInMonth)
  );

  useEffect(() => {
    setSchedule(createEmptySchedule(daysInMonth));
  }, [daysInMonth]);

  const handleToggleCell = (teacherId, shiftIndex, dayIndex) => {
    setSchedule((prev) => {
      const next = { ...prev };
      const teacherRows = prev[teacherId].map((row) => [...row]);
      teacherRows[shiftIndex][dayIndex] = !teacherRows[shiftIndex][dayIndex];
      next[teacherId] = teacherRows;
      return next;
    });
  };

  const totalsByTeacher = useMemo(() => {
    const totals = {};
    TEACHERS.forEach((t) => {
      let count = 0;
      const rows = schedule[t.id];
      if (rows) {
        rows.forEach((row) =>
          row.forEach((cell) => {
            if (cell) count += 1;
          })
        );
      }
      totals[t.id] = count;
    });
    return totals;
  }, [schedule]);

  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-bold uppercase">
        Chấm công giáo viên
      </h1>

      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-semibold">Tháng</label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {MONTH_OPTIONS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Năm</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-slate-100 text-xs">
              <th className="sticky left-0 z-10 border px-2 py-2 bg-slate-100">
                Giáo viên / Ca dạy
              </th>
              {days.map((d) => (
                <th
                  key={d.day}
                  className={`border px-1 py-1 text-center align-bottom min-w-[35px] ${
                    d.weekday === "CN" || d.weekday === "Th7"
                      ? "bg-red-50 text-red-600"
                      : "text-slate-600"
                  }`}
                >
                  <div className="font-semibold">{d.weekday}</div>
                  <div>{String(d.day).padStart(2, "0")}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {TEACHERS.map((teacher) => (
              <React.Fragment key={teacher.id}>
                <tr className="bg-red-500 text-white text-xs">
                  <td
                    className="sticky left-0 z-10 border px-2 py-1 bg-red-500 font-semibold"
                    colSpan={days.length + 2}
                  >
                    {teacher.name}
                  </td>
                </tr>

                {teacher.shifts.map((shift, shiftIndex) => {
                  const teacherRows = schedule[teacher.id] || [];
                  const row = teacherRows[shiftIndex] || [];

                  return (
                    <tr key={shift}>
                      <td className="sticky left-0 z-10 border bg-amber-50 px-2 py-1 text-xs font-medium">
                        {shift}
                      </td>

                      {days.map((d, dayIndex) => {
                        const checked = row[dayIndex];
                        return (
                          <td
                            key={dayIndex}
                            className="border px-1 py-1 text-center"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleCell(
                                  teacher.id,
                                  shiftIndex,
                                  dayIndex
                                )
                              }
                              className={cn(
                                "inline-flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold leading-none transition-all duration-200 ease-in-out",
                                checked
                                  ? "bg-red-500 text-white shadow-sm scale-105"
                                  : "bg-blue-400 text-slate-300 hover:bg-red-200 hover:text-red-500"
                              )}
                            >
                              {checked ? "✓" : ""}
                            </button>
                          </td>
                        );
                      })}

                      <td className="border px-2 py-1 text-center"></td>
                    </tr>
                  );
                })}

                <tr className="bg-slate-100 text-xs">
                  <td className="sticky left-0 z-10 border bg-slate-100 px-2 py-1 text-right font-semibold">
                    Tổng số ca
                  </td>
                  <td
                    className="border px-2 py-1 text-left font-semibold text-rose-600"
                    colSpan={days.length + 1}
                  >
                    {totalsByTeacher[teacher.id] || 0}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
