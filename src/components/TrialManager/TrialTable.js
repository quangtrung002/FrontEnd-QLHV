import React from "react";
import { renderSortIcon } from "services/render_icon";
import TdGrade from "services/tdGrade";

export default function TrialTable({
  data,
  startIndex,
  onSort,
  onOpenFeedback,
  onConfirmOfficial,
}) {
  const getSessionData = (user, sessionNum) => {
    return user.feedbacks?.find((f) => f.session === sessionNum);
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-blue-500 text-white text-xs uppercase">
            <th
              className="border px-3 py-3 text-center w-16 cursor-pointer hover:bg-slate-200 transition select-none"
              onClick={onSort}
            >
              <div className="flex items-center justify-center gap-1">
                <span>STT</span>
                {renderSortIcon()}
              </div>
            </th>
            <th className="border px-3 py-3 text-left min-w-[150px]">
              Học viên
            </th>
            <th className="border px-3 py-3 text-center w-28">Khối</th>
            <th className="border px-3 py-3 text-center w-40">Buổi 1</th>
            <th className="border px-3 py-3 text-center w-40">Buổi 2</th>
            <th className="border px-3 py-3 text-center w-40">Buổi 3</th>
            <th className="border px-3 py-3 text-center w-40">Buổi 4</th>
            <th className="border px-3 py-3 text-center w-[150px] max-w-[200px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-3 py-8 text-center text-slate-500">
                Không tìm thấy học viên nào.
              </td>
            </tr>
          ) : (
            data.map((user, index) => (
              <tr key={user.studentId} className="hover:bg-slate-50">
                <td className="border px-3 py-2 text-center text-slate-500">
                  {index + 1}
                </td>
                <td className="border px-3 py-2">
                  <div className="font-semibold text-slate-800">
                    {user.username}
                  </div>
                  <div className="text-xs text-slate-500">{user.code}</div>
                </td>
                <TdGrade str={user.grade} cssInput="text-center" />

                {[1, 2, 3, 4].map((sessionNum) => {
                  const sessionData = getSessionData(user, sessionNum);
                  const hasData = !!sessionData?.comment;

                  return (
                    <td
                      key={sessionNum}
                      className="border px-2 py-2 text-center"
                    >
                      <button
                        onClick={() => onOpenFeedback(user, sessionNum)}
                        className={`group relative w-full rounded border border-dashed py-1.5 text-xs transition-all ${
                          hasData
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "border-slate-300 text-slate-400 hover:border-blue-400 hover:text-blue-500"
                        }`}
                      >
                        {hasData ? (
                          <div className="flex flex-col items-center">
                            <span className="font-bold">✓ Đã nhập</span>
                            <span className="text-[10px] opacity-80">
                              {sessionData.date.split("-").reverse().join("/")}
                            </span>
                          </div>
                        ) : (
                          <span>+ Nhập</span>
                        )}
                      </button>
                    </td>
                  );
                })}

                <td className="border px-3 py-2">
                  <button
                    onClick={() => onConfirmOfficial(user)}
                    className="mx-auto flex w-[150px] items-center justify-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    <span>Chuyển CT</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
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
