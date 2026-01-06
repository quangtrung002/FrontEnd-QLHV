import React, { useState } from "react";

function getTodayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function LeaveModal({ isOpen, onClose, onSave, students }) {
  const [form, setForm] = useState({
    userId: "",
    date: getTodayISO(),
    reason: "",
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
    onSave(form);
    setForm({
      userId: "",
      date: getTodayISO(),
      reason: "",
    });
  };

  const title = "Thêm ngày nghỉ cho học viên";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold uppercase text-center">
          {title}
        </h2>

        <div className="space-y-4 text-sm">
          <div>
            <label className="mb-1 block font-medium">Họ và tên học viên</label>
            <select
              value={form.userId}
              onChange={(e) => handleChange("userId", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">-- Chọn học viên --</option>
              {students.map((u) => (
                <option key={u.u_id} value={u.u_id}>
                  {u.u_username} ({u.s_code}) - {u.s_grade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Ngày nghỉ</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Lý do nghỉ</label>
            <textarea
              rows={3}
              value={form.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              placeholder="Ví dụ: Ốm, đi đám cưới, bận việc gia đình..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSaveClick}
            className="rounded !bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
