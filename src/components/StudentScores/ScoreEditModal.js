import React, { useState, useEffect } from "react";

export default function ScoreEditModal({ isOpen, initialData, term, onClose, onSave, calculateSummary }) {
  const [formData, setFormData] = useState(initialData);

  // Cập nhật formData khi initialData thay đổi (mở modal với học viên khác)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  if (!isOpen || !formData) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveClick = () => {
    // Basic validation
    if (
      (formData.mid && (formData.mid < 0 || formData.mid > 10)) ||
      (formData.gita && (formData.gita < 0 || formData.gita > 10)) ||
      (formData.final && (formData.final < 0 || formData.final > 10))
    ) {
        // Validation lỗi sẽ được xử lý ở đây hoặc truyền callback lỗi về cha
        // Ở đây ta cứ truyền về cha để cha xử lý notification error
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-lg font-semibold">
          Nhập điểm cho: {formData.username} – {formData.grade}
        </h2>
        <p className="mb-4 text-xs text-slate-600">Học kì {term}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Giữa kì</label>
            <input
              type="number" min="0" max="10" step="0.1"
              value={formData.mid}
              onChange={(e) => handleInputChange("mid", e.target.value)}
              className="w-full rounded border border-slate-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Điểm GITA</label>
            <input
              type="number" min="0" max="10" step="0.1"
              value={formData.gita}
              onChange={(e) => handleInputChange("gita", e.target.value)}
              className="w-full rounded border border-slate-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Cuối kì</label>
            <input
              type="number" min="0" max="10" step="0.1"
              value={formData.final}
              onChange={(e) => handleInputChange("final", e.target.value)}
              className="w-full rounded border border-slate-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Tổng kết</label>
            <input
              type="number"
              readOnly
              value={calculateSummary(formData.mid, formData.gita, formData.final)}
              className="w-full rounded border border-slate-300 px-2 py-1 bg-gray-100 outline-none"
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
            className="px-4 py-2 rounded bg-red-600 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}