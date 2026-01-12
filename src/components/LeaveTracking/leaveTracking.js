import React, { useState } from "react";
import Pagination from "services/pagination";
import LeaveModal from "./leaveModal";
import ConfirmModal from "./confirmModal";
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
import LeaveTable from "./leaveTable";

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

  const openCreateModal = () => setIsModalOpen(true);
  const closeLeaveModal = () => setIsModalOpen(false);

  const handleSaveFromModal = (form) => {
    const { userId, date, reason } = form;
    if (userId && date && reason) {
      createLeaveRequestMutation({ userId: +userId, date, reason });
    } else notificationWarning("Vui lòng nhập đầy đủ thông tin!");

    closeLeaveModal();
  };

  const handleDeleteClick = (leave) => setDeleteTarget(leave);
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteLeaveRequestMutation(deleteTarget.id);
    setDeleteTarget(null);
  };
  const handleCancelDelete = () => setDeleteTarget(null);

  const handleApplyDateFilter = () => {
    if (fromDateInput && toDateInput && fromDateInput > toDateInput) {
      notificationWarning("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
      return;
    }
    setFilterDate({ startDate: fromDateInput, endDate: toDateInput });
    setPage(1);
  };

  const handleSort = () => setIsSort(!isSort);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const totalItems = leaves.length;
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageLeaves = leaves.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
            className="h-10 w-64 rounded-lg border border-slate-300 px-3 text-sm"
            placeholder="Tìm theo tên, mã, ngày, lý do nghỉ..."
          />

          <div className="flex items-center gap-2">
            <span className="text-sm">Từ ngày:</span>
            <input
              type="date"
              value={fromDateInput}
              onChange={(e) => setFromDateInput(e.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">Đến ngày:</span>
            <input
              type="date"
              value={toDateInput}
              onChange={(e) => setToDateInput(e.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm"
            />
          </div>

          <button
            type="button"
            onClick={handleApplyDateFilter}
            className="h-10 rounded-lg border border-slate-300 bg-yellow-300 px-4 text-sm font-semibold hover:bg-yellow-400"
          >
            Lọc
          </button>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="h-10 rounded-lg !bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          + Thêm mới
        </button>
      </div>

      <LeaveTable
        pageLeaves={pageLeaves}
        onDelete={handleDeleteClick}
        onSort={handleSort}
        isSort={isSort}
      />

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
              }" vào ngày ${deleteTarget.date
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}`
            : ""
        }
        confirmLabel="Xóa"
        cancelLabel="Hủy"
      />
    </div>
  );
}
