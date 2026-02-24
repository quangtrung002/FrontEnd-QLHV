import React, { useState, useMemo } from "react";
import TeacherModal from "./TeacherModal";
import AbsenceModal from "./AbsenceModal";
import AttendanceTable from "./AttendanceTable";
import AbsenceList from "./AbsenceList";
import ConfirmModal from "./ConfirmModal";
import {
  notificationError,
  notificationSuccess,
} from "notification/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAbsence,
  deleteAbsence,
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
} from "apis/teacher.api";
import TeacherManagementTable from "./TeacherManagentTable";

const WEEKDAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export default function TeacherAttendance() {
  const [activeTab, setActiveTab] = useState("attendance");
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ["absence-teachers", month, year],
    queryFn: () => getAllTeachers({ filter: { month, year } }),
  });

  const { mutateAsync: createAbsenceMutation } = useMutation({
    mutationFn: createAbsence,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Thêm lý do nghỉ thành công!");
        queryClient.invalidateQueries(["absence-teachers", month, year]);
      }
    },
    onError: (res) => {
      notificationError(res.msg);
    },
  });

  const { mutateAsync: deleteAbsenceMutation } = useMutation({
    mutationFn: deleteAbsence,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Xóa lý do nghỉ thành công!");
        queryClient.invalidateQueries(["absence-teachers", month, year]);
      }
    },
    onError: (res) => {
      notificationError(res.msg);
    },
  });

  const { mutateAsync: deleteTeacherMutation } = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Xóa lý do nghỉ thành công!");
        queryClient.invalidateQueries(["absence-teachers", month, year]);
      }
    },
    onError: (res) => {
      notificationError(res.msg);
    },
  });

  const { mutateAsync: updateTeacherMutation } = useMutation({
    mutationFn: updateTeacher,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Cập nhật thông tin thành công!");
        queryClient.invalidateQueries(["absence-teachers", month, year]);
      }
    },
    onError: (res) => {
      notificationError(res.msg);
    },
  });

  const teachers = response?.data.teachers || [];
  const absences = response?.data.leaves || [];
  const schedules = response?.data.schedules || [];

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null,
    id: null,
    title: "",
    message: "",
  });

  const daysInMonth = useMemo(
    () => new Date(year, month, 0).getDate(),
    [month, year],
  );

  const days = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const d = new Date(year, month - 1, day);
      const weekday = WEEKDAY_LABELS[d.getDay()];
      return { day, weekday };
    });
  }, [daysInMonth, month, year]);

  const handleSaveAbsence = (formData) => {
    createAbsenceMutation(formData);
    setIsAbsenceModalOpen(false);
  };

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
      updateTeacherMutation({ id: editingTeacher.id, data: formData });
    }
    setModalOpen(false);
  };

  const handleDeleteTeacherClick = (id) => {
    setConfirmModal({
      isOpen: true,
      type: "DELETE_TEACHER",
      id,
      title: "Xóa giáo viên",
      message:
        "Bạn có chắc chắn muốn xóa giáo viên này không? Hành động này sẽ xóa cả lịch sử chấm công.",
    });
  };

  const handleDeleteAbsenceClick = (id) => {
    setConfirmModal({
      isOpen: true,
      type: "DELETE_ABSENCE",
      id,
      title: "Xóa báo nghỉ",
      message: "Bạn có chắc chắn muốn xóa báo nghỉ này không?",
    });
  };

  const onConfirmAction = () => {
    if (confirmModal.type === "DELETE_ABSENCE") {
      deleteAbsenceMutation(confirmModal.id);
    } else if (confirmModal.type === "DELETE_TEACHER") {
      deleteTeacherMutation(confirmModal.id);
    }
    setConfirmModal((prev) => ({ ...prev, isOpen: false, id: null }));
  };

  const onCloseConfirm = () => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false, id: null }));
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-500">Đang tải dữ liệu...</div>
    );
  }

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
                      {m}
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
            schedules={schedules}
            month={month}
            year={year}
          />

          <AbsenceList
            absences={absences}
            onDelete={handleDeleteAbsenceClick}
          />
        </div>
      )}

      {activeTab === "management" && (
        <>
          <div className="mb-4 flex items-center justify-end">
            <button
              onClick={handleOpenCreate}
              className="flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <span className="text-lg leading-none">+</span>
              <span>Thêm Giáo viên</span>
            </button>
          </div>

          <TeacherManagementTable
            teachers={teachers || []}
            page={page}
            onPageChange={setPage}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteTeacherClick}
          />
        </>
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
