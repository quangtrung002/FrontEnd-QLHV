import { notificationSuccess } from "notification/notification";
import React from "react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  isDanger = false, 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white shadow-xl">
        <div className="border-b px-4 py-3">
          <h3 className="text-lg font-bold text-slate-800">
            {title || "Xác nhận"}
          </h3>
        </div>
        
        <div className="p-4 text-sm text-slate-600 whitespace-pre-wrap">
          {message || "Bạn có chắc chắn muốn thực hiện hành động này không?"}
        </div>

        <div className="flex justify-end gap-2 rounded-b-lg border-t bg-slate-50 px-4 py-3">
          <button
            onClick={onClose}
            className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              notificationSuccess("Đã chuyển thành học viên chính thức!");
            }}
            className={`rounded px-4 py-2 text-sm font-semibold text-white transition ${
              isDanger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}