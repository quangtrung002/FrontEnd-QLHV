import { notificationSuccess } from "notification/notification";
import { useState, useEffect } from "react";

export default function FeedbackModal({ open, data, onClose, onSave }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data) setContent(data.content || "");
  }, [data]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Nhận xét học viên: {data.name}
        </h2>

        <textarea
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-300"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Hủy
          </button>
          <button
            onClick={() => {
              onSave(content);
              notificationSuccess("Lưu nhận xét thành công!");
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
