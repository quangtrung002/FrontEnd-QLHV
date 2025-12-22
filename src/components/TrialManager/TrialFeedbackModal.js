import { notificationSuccess } from "notification/notification";
import React, { useEffect, useState } from "react";

export default function TrialFeedbackModal({ isOpen, onClose, onSave, data }) {
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (isOpen && data) {
      setDate(data.currentData?.date || new Date().toISOString().split("T")[0]);
      setComment(data.currentData?.comment || "");
    }
  }, [isOpen, data]);

  if (!isOpen || !data) return null;

  const handleSave = () => {
    if (!comment.trim()) {
      alert("Vui lòng nhập nội dung nhận xét.");
      return;
    }
    onSave({
      userId: data.userId,
      session: data.session,
      date,
      comment,
    });
    notificationSuccess("Đã lưu đánh giá thành công!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-lg font-bold text-slate-800">
          Đánh giá Buổi {data.session}
        </h2>
        <p className="mb-4 text-sm text-slate-500">
          Học viên: <span className="font-semibold text-slate-700">{data.studentName}</span>
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Ngày học
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Nhận xét của giáo viên
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập tình hình học tập, thái độ..."
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t pt-4">
          <button
            onClick={onClose}
            className="rounded px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Lưu đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}