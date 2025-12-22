import { notificationSuccess } from "notification/notification";
import React from "react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white shadow-xl">
        <div className="border-b px-4 py-3">
          <h3 className="text-lg font-bold text-slate-800">
            {title || "Xác nhận"}
          </h3>
        </div>

        <div className="p-4 text-sm text-slate-600">
          {message || "Bạn có chắc chắn muốn thực hiện hành động này không?"}
        </div>

        <div className="flex justify-end gap-2 rounded-b-lg border-t bg-slate-50 px-4 py-3">
          <button
            onClick={onClose}
            className="rounded px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
          >
            Hủy bỏ
          </button>
          <button
            onClick={() => {
              onConfirm();
              notificationSuccess("Xóa thành công");
            }}
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
