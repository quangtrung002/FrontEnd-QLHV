import React from "react";
import TdGrade from "services/tdGrade"; // Giữ nguyên import của bạn

export default function ScoreTable({ rows, onEdit, calculateSummary }) {
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-blue-500 text-white text-xs">
            <th className="px-3 py-2 border-b border-blue-600 text-center">
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
          {rows.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-3 py-4 text-center text-slate-500">
                Không tìm thấy học viên nào.
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-3 py-2 border-b border-slate-200 text-center text-slate-500">
                  {idx + 1}
                </td>
                <td className="px-3 py-2 border-b border-slate-200">
                  {row.username}
                </td>
                <TdGrade str={row.grade} cssInput="text-center" />
                <td className="px-3 py-2 border-b border-slate-200 text-center">
                  {row.mid ? row.mid : 0}
                </td>
                <td className="px-3 py-2 border-b border-slate-200 text-center">
                  {row.gita ? row.gita : 0}
                </td>
                <td className="px-3 py-2 border-b border-slate-200 text-center">
                  {row.final ? row.final : 0}
                </td>
                <td className="px-3 py-2 border-b border-slate-200 text-center font-bold text-blue-600">
                  {calculateSummary(row.mid, row.gita, row.final)}
                </td>
                <td className="px-3 py-2 border-b border-slate-200 text-center">
                  <button
                    type="button"
                    onClick={() => onEdit(row)}
                    className="inline-flex items-center gap-1 rounded border border-sky-500 px-2 py-1 text-xs font-medium text-sky-600 hover:bg-sky-50 transition"
                  >
                    <span>Nhập điểm</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
