import { notificationSuccess } from "notification/notification";
import React, { useState, useEffect } from "react";

export default function AbsenceModal({ isOpen, onClose, onSave, teachers }) {
  const [formData, setFormData] = useState({
    teacherId: "",
    date: "",
    reason: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ teacherId: "", date: "", reason: "" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.teacherId || !formData.date || !formData.reason) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const selectedTeacher = teachers.find(
      (t) => String(t.id) === String(formData.teacherId)
    );
    onSave({
      ...formData,
      teacherName: selectedTeacher ? selectedTeacher.fullName : "",
    });
    notificationSuccess("Thêm mới ngày nghỉ thành công");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-bold uppercase text-slate-700">
          Báo nghỉ giáo viên
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Giáo viên
            </label>
            <select
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              value={formData.teacherId}
              onChange={(e) =>
                setFormData({ ...formData, teacherId: e.target.value })
              }
            >
              <option value="">-- Chọn giáo viên --</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Ngày nghỉ
            </label>
            <input
              type="date"
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Lý do
            </label>
            <textarea
              rows={3}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t pt-4">
          <button
            onClick={onClose}
            className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Lưu báo nghỉ
          </button>
        </div>
      </div>
    </div>
  );
}