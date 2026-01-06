import React, { useState } from "react";
import Pagination from "services/pagination";
import LeaveModal from "./leaveModal";
import ConfirmModal from "./confirmModal";
import TdGrade from "services/tdGrade";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLeaveRequest,
  deleteLeaveRequest,
  getListLeaveRequests,
  getListStudentDropList,
} from "apis/student.api";
import useDebounce from "services/useDebounce";
import {
  notificationError,
  notificationSuccess,
  notificationWarning,
} from "notification/notification";
import { renderSortIcon } from "services/render_icon";

const ITEMS_PER_PAGE = 10;

export default function LeaveTracking() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [fromDateInput, setFromDateInput] = useState("");
  const [toDateInput, setToDateInput] = useState("");
  const [filterDate, setFilterDate] = useState({ startDate: "", endDate: "" });

  const searchDebouced = useDebounce(search, 1000);
  const [isSort, setIsSort] = useState(true);
  const queryClient = useQueryClient();

  const { data: response } = useQuery({
    queryKey: ["leaveRequestStudent", filterDate, searchDebouced, page, isSort],
    queryFn: () =>
      getListLeaveRequests({
        sort: isSort ? "id" : "-id",
        page,
        limit: ITEMS_PER_PAGE,
        search: searchDebouced,
        filter: filterDate,
      }),
  });

  const { data: result } = useQuery({
    queryKey: "allStudentDropList",
    queryFn: () => getListStudentDropList(),
  });

  const { mutateAsync: createLeaveRequestMutation } = useMutation({
    mutationFn: createLeaveRequest,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Thêm lý do thành công!");
        queryClient.invalidateQueries({ queryKey: ["leaveRequestStudent"] });
      }
    },
    onError: (res) => {
      if (!res.success) {
        notificationError(res.msg);
      }
    },
  });

  const { mutateAsync: deleteLeaveRequestMutation } = useMutation({
    mutationFn: deleteLeaveRequest,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Xóa thành công!");
        queryClient.invalidateQueries({ queryKey: ["leaveRequestStudent"] });
      }
    },
    onError: (res) => {
      if (!res.success) {
        notificationError(res.msg);
      }
    },
  });

  const leaves = response?.data || [];
  const allUsers = result?.data || [];

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  const closeLeaveModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveFromModal = (form) => {
    const { userId, date, reason } = form;
    if ((userId, date, reason)) {
      createLeaveRequestMutation({ userId: +userId, date, reason });
    } else notificationWarning("Vui lòng nhập đầy đủ thông tin!");

    closeLeaveModal();
  };

  const handleDeleteClick = (leave) => {
    setDeleteTarget(leave);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteLeaveRequestMutation(deleteTarget.id);
    setDeleteTarget(null);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  const handleApplyDateFilter = () => {
    if (fromDateInput && toDateInput && fromDateInput > toDateInput) {
      notificationWarning("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
      return;
    }
    setFilterDate({ startDate: fromDateInput, endDate: toDateInput });
    setPage(1);
  };

  const handleSort = () => setIsSort(!isSort);

  const totalItems = leaves.length;
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageLeaves = leaves.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-bold uppercase">
        Theo dõi ngày nghỉ học sinh
      </h1>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-10 w-64 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tìm theo tên, mã, ngày, lý do nghỉ..."
          />

          <div className="flex items-center gap-2">
            <span className="text-sm">Từ ngày:</span>
            <input
              type="date"
              value={fromDateInput}
              onChange={(e) => setFromDateInput(e.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Đến ngày:</span>
            <input
              type="date"
              value={toDateInput}
              onChange={(e) => setToDateInput(e.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            type="button"
            onClick={handleApplyDateFilter}
            className="h-10 rounded-lg border border-slate-300 bg-yellow-300 px-4 text-sm font-semibold text-slate-700 hover:bg-yellow-300 transition"
          >
            Lọc
          </button>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-2 h-10 rounded-lg !bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700 transition"
        >
          + Thêm mới
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr className="bg-blue-500 text-white text-xs">
              <th
                className="border px-3 py-2 text-center w-16 cursor-pointer hover:bg-slate-200 transition select-none group"
                onClick={handleSort}
                title="Sắp xếp theo ID"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>STT</span>
                  {renderSortIcon(isSort)}
                </div>
              </th>
              <th className="border px-3 py-2 text-left">Họ tên học viên</th>
              <th className="border px-3 py-2 text-center">Khối</th>
              <th className="border px-3 py-2 text-center">Ngày nghỉ</th>
              <th className="border px-3 py-2 text-left">Lý do nghỉ</th>
              <th className="border px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageLeaves.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-4 text-center text-slate-500"
                >
                  Chưa có dữ liệu ngày nghỉ.
                </td>
              </tr>
            ) : (
              pageLeaves.map((l, idx) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="border px-3 py-2 text-center text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="border px-3 py-2">{l.student_username}</td>
                  <TdGrade str={l.grade} cssInput="text-center" />
                  <td className="border px-3 py-2 text-center">
                    {l.date.split("T")[0]}
                  </td>
                  <td className="border px-3 py-2">{l.reason}</td>
                  <td className="border px-3 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(l)}
                      className="p-1 rounded hover:bg-slate-100"
                      title="Xóa"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M6 7.5h12" />
                        <path d="M9.75 4.5h4.5L15 6H9l.75-1.5Z" />
                        <path d="M8.25 7.5 9 19.5h6l.75-12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemLabel="ngày nghỉ"
      />

      <LeaveModal
        isOpen={isModalOpen}
        onClose={closeLeaveModal}
        onSave={handleSaveFromModal}
        students={allUsers}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa ngày nghỉ"
        message={
          deleteTarget
            ? `Bạn có chắc muốn xóa ngày nghỉ của "${
                deleteTarget.student_username
              }" vào ngày ${deleteTarget.date.split("T")[0]}`
            : ""
        }
        confirmLabel="Xóa"
        cancelLabel="Hủy"
      />
    </div>
  );
}
