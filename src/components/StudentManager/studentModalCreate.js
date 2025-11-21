import React, { useEffect, useState } from "react";

const initialForm = {
  fullName: "",
  grade: "",
  dob: "",
  fatherName: "",
  motherName: "",
  status: "chính thức",
  active: "active",
  address: "",
  fatherPhone: "",
  motherPhone: "",
  referrer: "",
};

export default function StudentCreateModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold">Thêm học viên mới</h2>

        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">Họ và tên học viên</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Ví dụ: Nguyễn Văn A"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Khối</label>
            <select
              value={form.grade}
              onChange={(e) => handleChange("grade", e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Chọn khối</option>
              <option value="Lớp 3">Lớp 3</option>
              <option value="Lớp 4">Lớp 4</option>
              <option value="Lớp 5">Lớp 5</option>
              <option value="Lớp 6">Lớp 6</option>
              <option value="Lớp 7">Lớp 7</option>
              <option value="Lớp 8">Lớp 8</option>
              <option value="Lớp 9">Lớp 9</option>
              <option value="Lớp 10">Lớp 10</option>
              <option value="Lớp 11">Lớp 11</option>
              <option value="Lớp 12">Lớp 12</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Ngày sinh</label>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Trạng thái</label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="chính thức">Chính thức</option>
              <option value="trải nghiệm">Trải nghiệm</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Active</label>
            <select
              value={form.active}
              onChange={(e) => handleChange("active", e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">Địa chỉ</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Họ và tên bố</label>
            <input
              type="text"
              value={form.fatherName}
              onChange={(e) => handleChange("fatherName", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Ví dụ: Nguyễn Văn B"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Số điện thoại bố</label>
            <input
              type="text"
              value={form.fatherPhone}
              onChange={(e) => handleChange("fatherPhone", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Ví dụ: 09xx..."
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Họ và tên mẹ</label>
            <input
              type="text"
              value={form.motherName}
              onChange={(e) => handleChange("motherName", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Ví dụ: Trần Thị C"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Số điện thoại mẹ</label>
            <input
              type="text"
              value={form.motherPhone}
              onChange={(e) => handleChange("motherPhone", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Ví dụ: 09xx..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block font-medium">Người giới thiệu</label>
            <input
              type="text"
              value={form.referrer}
              onChange={(e) => handleChange("referrer", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Ví dụ: cô Lan, anh Nam..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border border-slate-300 text-sm hover:bg-slate-100"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSaveClick}
            className="px-4 py-2 rounded bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
