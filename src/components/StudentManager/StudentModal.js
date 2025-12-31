import { notificationSuccess } from "notification/notification";
import React, { useEffect, useState } from "react";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const initialForm = {
  id: null,
  username: "",
  email: "",
  avatarURL: "",
  code: "",
  grade: "",
  dob: "",
  fatherName: "",
  motherName: "",
  active: "CT",
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
      if (user && mode !== "create") {
        const profile = user.studentProfile || {};

        setForm({
          id: user.id,
          username: user.username || "",
          email: user.email || "",
          avatarURL: user.avatarURL || "",
          code: profile.code || "",
          grade: profile.grade || "",
          dob: profile.dob ? profile.dob.split("T")[0] : "",
          address: profile.address || "",
          fatherName: profile.fatherName || "",
          motherName: profile.motherName || "",
          fatherPhone: profile.fatherPhone || "",
          motherPhone: profile.motherPhone || "",
          referrer: profile.referrer || "",
          active: profile.active || "CT",
          school: profile.school || "",
          gender: profile.gender || "Male",
          createdAt: user.createdAt.split("T")[0] || "",
        });
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

  const handlePrimaryAction = () => {
    if (currentMode === "view") {
      setCurrentMode("edit");
    } else {
      onSave(form);
      onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="mb-6 text-xl font-bold text-center uppercase text-slate-700">
          {title}
        </h2>

        <div className="mb-6 flex flex-col items-center justify-center gap-3">
          <div className="relative group">
            <img
              src={form.avatarURL || DEFAULT_AVATAR}
              alt="Avatar"
              className="h-28 w-28 rounded-full object-cover border-4 border-slate-100 shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_AVATAR;
              }}
            />
            {!isDisabled && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer">
                <span className="text-xs font-semibold text-white">
                  Đổi ảnh
                </span>
              </div>
            )}
          </div>

          {!isDisabled && (
            <input
              type="text"
              placeholder="Dán link avatar..."
              className="text-xs border-b border-slate-300 outline-none text-center w-48 focus:border-blue-500 text-slate-600"
              value={form.avatarURL}
              onChange={(e) => handleChange("avatarURL", e.target.value)}
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Mã định danh <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.code || ""}
              disabled={isDisabled}
              placeholder="CCCD"
              onChange={(e) => handleChange("code", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Họ và tên học viên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.username || ""}
              onChange={(e) => handleChange("username", e.target.value)}
              disabled={isDisabled}
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={currentMode !== "create"}
              placeholder="email@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
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
            <label className="mb-1 block font-medium text-slate-700">
              Giới tính <span className="text-red-500">*</span>
            </label>
            <select
              value={form.gender || ""}
              onChange={(e) => handleChange("gender", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={form.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Trường
            </label>
            <input
              type="text"
              value={form.school || ""}
              onChange={(e) => handleChange("school", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Địa chỉ
            </label>
            <input
              type="text"
              value={form.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Họ và tên bố
            </label>
            <input
              type="text"
              value={form.fatherName || ""}
              onChange={(e) => handleChange("fatherName", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Số điện thoại bố
            </label>
            <input
              type="text"
              value={form.fatherPhone || ""}
              onChange={(e) => handleChange("fatherPhone", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Họ và tên mẹ
            </label>
            <input
              type="text"
              value={form.motherName || ""}
              onChange={(e) => handleChange("motherName", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Số điện thoại mẹ
            </label>
            <input
              type="text"
              value={form.motherPhone || ""}
              onChange={(e) => handleChange("motherPhone", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Trạng thái
            </label>
            <select
              value={form.active || "CT"}
              onChange={(e) => handleChange("active", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="CT">Chính thức</option>
              <option value="TN">Trải nghiệm</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-slate-700">
              Người giới thiệu
            </label>
            <input
              type="text"
              value={form.referrer || ""}
              onChange={(e) => handleChange("referrer", e.target.value)}
              disabled={isDisabled}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {currentMode !== "create" && (
            <div>
              <label className="mb-1 block font-medium text-slate-700">
                Ngày bắt đầu học:
              </label>
              <input
                type="date"
                value={form.createdAt}
                disabled
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 transition text-slate-600"
          >
            {currentMode === "view" ? "Đóng" : "Hủy bỏ"}
          </button>
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="rounded-lg !bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm shadow-blue-200"
          >
            {primaryBtnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
