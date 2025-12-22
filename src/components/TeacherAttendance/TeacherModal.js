import React, { useEffect, useState } from "react";

const AVAILABLE_SHIFTS = [
  "Ca 1: 08:00 - 09:30",
  "Ca 2: 09:45 - 11:15",
  "Ca 3: 14:00 - 15:30",
  "Ca 4: 15:45 - 17:15",
  "Ca 5: 17:30 - 19:00",
  "Ca 6: 19:15 - 20:45",
  "Ca 7: 18:15 - 19:45",
  "Ca 8: 20:00 - 21:30",
];

export default function TeacherModal({ isOpen, onClose, onSave, teacher }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    shifts: [],
  });

  useEffect(() => {
    if (isOpen) {
      if (teacher) {
        setForm({
          fullName: teacher.fullName || "",
          phone: teacher.phone || "",
          email: teacher.email || "",
          shifts: teacher.shifts || [],
        });
      } else {
        setForm({
          fullName: "",
          phone: "",
          email: "",
          shifts: [],
        });
      }
    }
  }, [isOpen, teacher]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleShiftToggle = (shift) => {
    setForm((prev) => {
      const currentShifts = prev.shifts;
      if (currentShifts.includes(shift)) {
        return { ...prev, shifts: currentShifts.filter((s) => s !== shift) };
      } else {
        return { ...prev, shifts: [...currentShifts, shift] };
      }
    });
  };

  const handleSubmit = () => {
    if (!form.fullName.trim()) {
      alert("Vui lòng nhập tên giáo viên");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold uppercase text-slate-700">
          {teacher ? "Cập nhật thông tin giáo viên" : "Thêm giáo viên mới"}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ví dụ: Nguyễn Văn A"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Số điện thoại
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="rounded bg-slate-50 p-4 border border-slate-200">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Đăng ký ca dạy cố định:
            </label>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
              {AVAILABLE_SHIFTS.map((shift) => (
                <label
                  key={shift}
                  className="flex items-center gap-2 rounded border border-slate-200 bg-white p-2 hover:bg-blue-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.shifts.includes(shift)}
                    onChange={() => handleShiftToggle(shift)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{shift}</span>
                </label>
              ))}
            </div>
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
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  );
}
