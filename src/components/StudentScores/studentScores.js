import React, { useState } from "react";
import users from "data-user";
import TdGrade from "services/tdGrade";

const ITEMS_PER_PAGE = 15;

export default function StudentScores() {
  // context năm học / học kì người dùng đang chọn (control)
  const [yearControl, setYearControl] = useState("2025-2026");
  const [termControl, setTermControl] = useState("1_2025_2026");

  // context năm học / học kì đang áp dụng cho bảng
  const [context, setContext] = useState({
    year: "2025-2026",
    term: "1_2025_2026",
  });

  // dữ liệu điểm cho từng học viên (4 cột điểm)
  const [rows, setRows] = useState(() =>
    users.map((u, index) => ({
      id: u.id ?? index + 1,
      fullName: u.fullName,
      grade: u.grade,

      mid: "",
      gita: "",
      final: "",
      summary: "",
    }))
  );

  const [page, setPage] = useState(1);

  // modal state
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const totalPages =
    rows.length > 0 ? Math.ceil(rows.length / ITEMS_PER_PAGE) : 1;
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageRows = rows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleApplyContext = () => {
    setContext({
      year: yearControl,
      term: termControl,
    });
    setPage(1);
  };

  const openEditModal = (row) => {
    setEditingId(row.id);
    setFormData({ ...row });
  };

  const closeModal = () => {
    setEditingId(null);
    setFormData(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!editingId || !formData) return;
    setRows((prev) =>
      prev.map((r) => (r.id === editingId ? { ...r, ...formData } : r))
    );
    closeModal();
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center mb-4 uppercase">
        Điểm học viên
      </h1>

      {/* Chọn năm học / học kì */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Năm học:</span>
            <select
              value={yearControl}
              onChange={(e) => setYearControl(e.target.value)}
              className="h-9 rounded-lg border border-slate-300 bg-white px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Học kì:</span>
            <select
              value={termControl}
              onChange={(e) => setTermControl(e.target.value)}
              className="h-9 rounded-lg border border-slate-300 bg-white px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="1_2025_2026">1_2025_2026</option>
              <option value="2_2025_2026">2_2025_2026</option>
              <option value="1_2026_2027">1_2026_2027</option>
              <option value="2_2026_2027">2_2026_2027</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleApplyContext}
            className="inline-flex items-center gap-1 h-9 rounded-lg bg-red-600 px-4 text-xs font-semibold text-white hover:bg-blue-700 transition"
          >
            Xác nhận
          </button>
        </div>

        <div className="text-slate-600">
          Đang xem: <span className="font-semibold">Học kì {context.term}</span>
        </div>
      </div>

      {/* Bảng điểm 4 cột */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-blue-500 text-white text-xs">
              <th className="px-3 py-2 border-b border-blue-600 text-left">
                STT
              </th>
              <th className="px-3 py-2 border-b border-blue-600 text-left">
                Họ và tên
              </th>
              <th className="px-3 py-2 border-b border-blue-600 text-center">
                Khối
              </th>
              <th className="px-3 py-2 border-b border-blue-600 text-center">
                Giữa kì
              </th>
              <th className="px-3 py-2 border-b border-blue-600 text-center">
                Điểm GITA
              </th>
              <th className="px-3 py-2 border-b border-blue-600 text-center">
                Cuối kì
              </th>
              <th className="px-3 py-2 border-b border-blue-600 text-center">
                Tổng kết
              </th>
              <th className="px-3 py-2 border-b border-blue-600 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-3 py-4 text-center text-slate-500"
                >
                  Không có học viên nào.
                </td>
              </tr>
            ) : (
              pageRows.map((row, idx) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-3 py-2 border-b border-slate-200">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-3 py-2 border-b border-slate-200">
                    {row.fullName}
                  </td>
                  
                  <TdGrade str={row.grade} cssInput="text-center"/>
                  <td className="px-3 py-2 border-b border-slate-200 text-center">
                    {row.mid ? row.mid : 0}
                  </td>
                  <td className="px-3 py-2 border-b border-slate-200 text-center">
                    {row.gita ? row.gita : 0}
                  </td>
                  <td className="px-3 py-2 border-b border-slate-200 text-center">
                    {row.final ? row.final : 0}
                  </td>
                  <td className="px-3 py-2 border-b border-slate-200 text-center">
                    {(row.mid + row.gita + row.final)/3}
                  </td>

                  <td className="px-3 py-2 border-b border-slate-200 text-center">
                    <button
                      type="button"
                      onClick={() => openEditModal(row)}
                      className="inline-flex items-center gap-1 rounded border border-sky-500 px-2 py-1 text-xs font-medium text-sky-600 hover:bg-sky-50 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M16.862 4.487 19.5 7.125m-2.638-2.638-8.508 8.508a4.5 4.5 0 0 0-1.2 2.164L6 18l2.841-.154a4.5 4.5 0 0 0 2.164-1.2l8.508-8.508-2.651-2.651Z" />
                        <path d="M19.5 14.25V19.5A1.5 1.5 0 0 1 18 21H4.5A1.5 1.5 0 0 1 3 19.5V6A1.5 1.5 0 0 1 4.5 4.5H9.75" />
                      </svg>
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700">
        <span>
          Hiển thị{" "}
          {rows.length === 0
            ? 0
            : `${startIndex + 1}–${Math.min(
                startIndex + ITEMS_PER_PAGE,
                rows.length
              )}`}{" "}
          / {rows.length} học viên
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
          >
            Trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
          >
            Sau
          </button>
        </div>
      </div>

      {/* Modal nhập 4 cột điểm */}
      {editingId && formData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-lg font-semibold">
              Nhập điểm cho: {formData.fullName} – {formData.grade}
            </h2>
            <p className="mb-4 text-xs text-slate-600">Học kì {context.term}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block mb-1 font-medium">Giữa kì</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.mid}
                  onChange={(e) => handleInputChange("mid", e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Điểm GITA</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.gita}
                  onChange={(e) => handleInputChange("gita", e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Cuối kì</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.final}
                  onChange={(e) => handleInputChange("final", e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Tổng kết</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded border border-slate-300 text-sm hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded bg-red-600 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
