import { notificationSuccess } from "notification/notification";
import React, { useEffect, useState } from "react";

const initialForm = {
  fullName: "",
  grade: "",
  dob: "",
  fatherName: "",
  motherName: "",
  status: "chính thức",
  address: "",
  fatherPhone: "",
  motherPhone: "",
  referrer: "",
};

export default function StudentModal({
  isOpen,
  user,
  mode = "view",
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(initialForm);
  const [currentMode, setCurrentMode] = useState("view");

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setForm({ ...user });
        setCurrentMode(mode);
      } else {
        setForm(initialForm);
        setCurrentMode("create");
      }
    }
  }, [isOpen, user, mode]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.fullName.trim() || !form.grade.trim()) {
      alert("Vui lòng nhập ít nhất Họ tên học viên và Khối.");
      return;
    }
    onSave(form);
    notificationSuccess(
      currentMode === "create"
        ? "Thêm học viên thành công!"
        : "Cập nhật thông tin học viên thành công!"
    );
    onClose();
  };

  const handlePrimaryAction = () => {
    if (currentMode === "view") {
      setCurrentMode("edit");
    } else {
      handleSubmit();
    }
  };

  let title = "Thông tin học viên";
  let primaryBtnLabel = "Lưu";

  if (currentMode === "create") {
    title = "Thêm học viên mới";
    primaryBtnLabel = "Thêm mới";
  } else if (currentMode === "view") {
    title = "Chi tiết học viên";
    primaryBtnLabel = "Sửa";
  } else if (currentMode === "edit") {
    title = "Cập nhật thông tin";
    primaryBtnLabel = "Lưu";
  }

  const isDisabled = currentMode === "view";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold">{title}</h2>

        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          {currentMode !== "create" && (
            <div>
              <label className="mb-1 block font-medium">Mã định danh</label>
              <input
                type="text"
                value={form.code || ""}
                disabled
                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm outline-none text-slate-500"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block font-medium">
              Họ và tên học viên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              disabled={isDisabled}
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Khối <span className="text-red-500">*</span>
            </label>
            <select
              value={form.grade || ""}
              onChange={(e) => handleChange("grade", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Chọn khối</option>
              {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={`Lớp ${g}`}>{`Lớp ${g}`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Ngày sinh</label>
            <input
              type="date"
              value={form.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div
            className={
              currentMode === "create" ? "md:col-span-1" : "md:col-span-2"
            }
          >
            <label className="mb-1 block font-medium">Địa chỉ</label>
            <input
              type="text"
              value={form.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Họ và tên bố</label>
            <input
              type="text"
              value={form.fatherName || ""}
              onChange={(e) => handleChange("fatherName", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Số điện thoại bố</label>
            <input
              type="text"
              value={form.fatherPhone || ""}
              onChange={(e) => handleChange("fatherPhone", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Họ và tên mẹ</label>
            <input
              type="text"
              value={form.motherName || ""}
              onChange={(e) => handleChange("motherName", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Số điện thoại mẹ</label>
            <input
              type="text"
              value={form.motherPhone || ""}
              onChange={(e) => handleChange("motherPhone", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Trạng thái</label>
            <select
              value={form.status || "chính thức"}
              onChange={(e) => handleChange("status", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="chính thức">Chính thức</option>
              <option value="trải nghiệm">Trải nghiệm</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Người giới thiệu</label>
            <input
              type="text"
              value={form.referrer || ""}
              onChange={(e) => handleChange("referrer", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100 transition"
          >
            {currentMode === "view" ? "Đóng" : "Hủy"}
          </button>
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="rounded !bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            {primaryBtnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
