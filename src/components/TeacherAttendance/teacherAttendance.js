import React, { useState, useMemo, useEffect } from "react";
import usersData from "data-user";
import Pagination from "services/pagination";
import TeacherModal from "./TeacherModal";
import AbsenceModal from "./AbsenceModal";
import AttendanceTable from "./AttendanceTable";
import AbsenceList from "./AbsenceList";
import ConfirmModal from "./ConfirmModal";
import { notificationSuccess } from "notification/notification";

const ITEMS_PER_PAGE = 10;
const WEEKDAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export default function TeacherAttendance() {
  const [allUsers, setAllUsers] = useState(usersData);
  const [activeTab, setActiveTab] = useState("attendance");

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [schedule, setSchedule] = useState({});

  const [absences, setAbsences] = useState([]);
  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null,
    id: null,
    title: "",
    message: "",
  });

  const teachers = useMemo(() => {
    let result = allUsers.filter((u) => u.role === "teacher");

    if (activeTab === "management" && search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.fullName.toLowerCase().includes(q) ||
          (t.phone && t.phone.includes(q))
      );
    }
    return result;
  }, [allUsers, search, activeTab]);

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

  useEffect(() => {
    const newSchedule = {};
    teachers.forEach((t) => {
      if (t.shifts && t.shifts.length > 0) {
        newSchedule[t.id] = t.shifts.map(() => Array(daysInMonth).fill(false));
      } else {
        newSchedule[t.id] = [];
      }
    });
    setSchedule(newSchedule);
  }, [daysInMonth, teachers.length]);

  const handleToggleCell = (teacherId, shiftIndex, dayIndex) => {
    setSchedule((prev) => {
      const next = { ...prev };
      if (!next[teacherId]) return next;

      const teacherRows = next[teacherId].map((row) => [...row]);
      teacherRows[shiftIndex][dayIndex] = !teacherRows[shiftIndex][dayIndex];
      next[teacherId] = teacherRows;
      return next;
    });
  };

  const totalsByTeacher = useMemo(() => {
    const totals = {};
    teachers.forEach((t) => {
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
  }, [schedule, teachers]);

  const currentMonthAbsences = useMemo(() => {
    return absences
      .filter((item) => {
        if (!item.date) return false;
        const [y, m] = item.date.split("-").map(Number);
        return m === parseInt(month) && y === parseInt(year);
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [absences, month, year]);

  const handleSaveAbsence = (formData) => {
    const newAbsence = { ...formData, id: Date.now() };
    setAbsences((prev) => [...prev, newAbsence]);

    if (formData.date) {
      const [y, m] = formData.date.split("-").map(Number);
      setMonth(m);
      setYear(y);
    }

    setIsAbsenceModalOpen(false);
  };

  const handleDeleteAbsenceClick = (id) => {
    setConfirmModal({
      isOpen: true,
      type: "DELETE_ABSENCE",
      id: id,
      title: "Xóa báo nghỉ",
      message: "Bạn có chắc chắn muốn xóa báo nghỉ này không?",
    });
  };

  const totalItems = teachers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(page, 1), totalPages || 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageTeachers = teachers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleOpenCreate = () => {
    setEditingTeacher(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (teacher) => {
    setEditingTeacher(teacher);
    setModalOpen(true);
  };

  const handleSaveTeacher = (formData) => {
    if (editingTeacher) {
      setAllUsers((prev) =>
        prev.map((u) =>
          u.id === editingTeacher.id ? { ...u, ...formData } : u
        )
      );
      notificationSuccess("Cập nhật giáo viên thành công");
    } else {
      const newId = Math.max(...allUsers.map((u) => u.id)) + 1;
      const newTeacher = {
        id: newId,
        role: "teacher",
        username: `teacher_${newId}`,
        ...formData,
      };
      setAllUsers((prev) => [...prev, newTeacher]);
      notificationSuccess("Thêm giáo viên thành công");
    }
    setModalOpen(false);
  };

  const handleDeleteTeacherClick = (id) => {
    setConfirmModal({
      isOpen: true,
      type: "DELETE_TEACHER",
      id: id,
      title: "Xóa giáo viên",
      message:
        "Bạn có chắc chắn muốn xóa giáo viên này không? Hành động này sẽ xóa cả lịch sử chấm công.",
    });
  };

  const onConfirmAction = () => {
    if (confirmModal.type === "DELETE_ABSENCE") {
      setAbsences((prev) => prev.filter((item) => item.id !== confirmModal.id));
    } else if (confirmModal.type === "DELETE_TEACHER") {
      setAllUsers((prev) => prev.filter((u) => u.id !== confirmModal.id));
    }
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  const onCloseConfirm = () => {
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-bold uppercase">
        Quản lý & Chấm công giáo viên
      </h1>

      <div className="mb-6 flex border-b border-slate-200">
        <button
          className={`px-6 py-3 text-sm font-semibold transition-colors ${
            activeTab === "attendance"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => setActiveTab("attendance")}
        >
          Bảng Chấm Công
        </button>
        <button
          className={`px-6 py-3 text-sm font-semibold transition-colors ${
            activeTab === "management"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => setActiveTab("management")}
        >
          Danh sách Giáo viên
        </button>
      </div>

      {activeTab === "attendance" && (
        <div className="animate-fade-in space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">
                  Tháng:
                </span>
                <select
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                  className="h-9 rounded border border-slate-300 px-2 text-sm outline-none focus:border-blue-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      Tháng {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Năm:</span>
                <select
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="h-9 rounded border border-slate-300 px-2 text-sm outline-none focus:border-blue-500"
                >
                  {[2024, 2025, 2026, 2027].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setIsAbsenceModalOpen(true)}
              className="rounded bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600"
            >
              + Báo nghỉ
            </button>
          </div>

          <AttendanceTable
            teachers={teachers}
            days={days}
            daysInMonth={daysInMonth}
            schedule={schedule}
            totalsByTeacher={totalsByTeacher}
            onToggleCell={handleToggleCell}
          />

          <AbsenceList
            absences={currentMonthAbsences}
            teachers={teachers}
            onDelete={handleDeleteAbsenceClick}
          />
        </div>
      )}

      {activeTab === "management" && (
        <div className="animate-fade-in">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="h-10 w-64 rounded-lg border border-slate-300 pl-3 pr-8 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Tìm tên giáo viên..."
              />
            </div>

            <button
              onClick={handleOpenCreate}
              className="flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <span className="text-lg leading-none">+</span>
              <span>Thêm Giáo viên</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                <tr>
                  <th className="border px-4 py-3 text-center w-16">ID</th>
                  <th className="border px-4 py-3 text-left w-48">Họ và tên</th>
                  <th className="border px-4 py-3 text-left w-32">Liên hệ</th>
                  <th className="border px-4 py-3 text-left">Ca dạy cố định</th>
                  <th className="border px-4 py-3 text-center w-32">
                    Hành động
                  </th>
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
                  pageTeachers.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition">
                      <td className="border px-4 py-3 text-center font-mono text-xs text-slate-500">
                        {t.id}
                      </td>
                      <td className="border px-4 py-3 font-semibold text-slate-700">
                        {t.fullName}
                      </td>
                      <td className="border px-4 py-3 text-slate-600">
                        <div className="text-xs">{t.phone}</div>
                        <div className="text-[10px] text-slate-400">
                          {t.email}
                        </div>
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
                            onClick={() => handleOpenEdit(t)}
                            className="rounded bg-amber-100 p-1.5 text-amber-600 hover:bg-amber-200 transition"
                            title="Sửa thông tin"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteTeacherClick(t.id)}
                            className="rounded bg-rose-100 p-1.5 text-rose-600 hover:bg-rose-200 transition"
                            title="Xóa giáo viên"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
            onPageChange={setPage}
            itemLabel="giáo viên"
          />
        </div>
      )}

      <TeacherModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTeacher}
        teacher={editingTeacher}
      />

      <AbsenceModal
        isOpen={isAbsenceModalOpen}
        onClose={() => setIsAbsenceModalOpen(false)}
        onSave={handleSaveAbsence}
        teachers={teachers}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={onCloseConfirm}
        onConfirm={onConfirmAction}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
}
