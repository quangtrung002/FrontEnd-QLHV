import React, { useMemo, useState } from "react";
import users from "data-user";
import StudentTable from "services/table";
import Pagination from "services/pagination";
import StudentDetailModal from "components/StudentManager/studentModalDetail";
import ConfirmModal from "components/StudentManager/confirmModal";

const ITEMS_PER_PAGE = 15;

export default function TrialStudents() {
  const [allUsers, setAllUsers] = useState(() => users);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [gradeFilterControl, setGradeFilterControl] = useState("");
  const [statusFilterControl, setStatusFilterControl] = useState("");
  const [activeFilterControl, setActiveFilterControl] = useState("inactive");
  const [filters, setFilters] = useState({
    grade: "",
    status: "",
    active: "inactive",
  });

  const [detailUser, setDetailUser] = useState(null);
  const [detailStartEdit, setDetailStartEdit] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredUsers = useMemo(() => {
    let result = allUsers;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((u) => {
        return (
          u.fullName.toLowerCase().includes(q) ||
          u.code.toLowerCase().includes(q) ||
          u.fatherName.toLowerCase().includes(q) ||
          u.motherName.toLowerCase().includes(q)
        );
      });
    }

    if (filters.grade) {
      result = result.filter((u) => u.grade === filters.grade);
    }

    if (filters.status) {
      result = result.filter(
        (u) =>
          String(u.status || "").toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.active) {
      result = result.filter(
        (u) =>
          String(u.active || "").toLowerCase() === filters.active.toLowerCase()
      );
    }

    return result;
  }, [allUsers, search, filters]);

  const totalItems = filteredUsers.length;
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleApplyFilter = () => {
    setFilters({
      grade: gradeFilterControl,
      status: statusFilterControl,
      active: activeFilterControl,
    });
    setPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setGradeFilterControl("");
    setStatusFilterControl("");
    setActiveFilterControl("inactive");
    setFilters({
      grade: "",
      status: "",
      active: "inactive",
    });
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const openDetailModal = (user, startEdit = false) => {
    setDetailUser(user);
    setDetailStartEdit(startEdit);
  };

  const closeDetailModal = () => {
    setDetailUser(null);
    setDetailStartEdit(false);
  };

  const handleUpdateUser = (updated) => {
    if (!updated) return;
    setAllUsers((prev) =>
      prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u))
    );
  };

  const handleDelete = (user) => {
    setDeleteTarget(user);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setAllUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-bold uppercase">
        Học viên trải nghiệm / nghỉ
      </h1>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            className="h-10 w-64 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tìm theo tên, mã học viên, phụ huynh..."
          />
          <button
            type="button"
            className="h-10 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={gradeFilterControl}
            onChange={(e) => setGradeFilterControl(e.target.value)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Khối</option>
            <option value="Lớp 3">Lớp 3</option>
            <option value="Lớp 4">Lớp 4</option>
            <option value="Lớp 5">Lớp 5</option>
            <option value="Lớp 6">Lớp 6</option>
            <option value="Lớp 7">Lớp 7</option>
            <option value="Lớp 8">Lớp 8</option>
            <option value="Lớp 9">Lớp 9</option>
            <option value="Lớp 10">Lớp 10</option>
            <option value="Lớp 11">Lớp 11</option>
            <option value="Lớp 12">Lớp 12</option>
          </select>

          <select
            value={statusFilterControl}
            onChange={(e) => setStatusFilterControl(e.target.value)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Trạng thái</option>
            <option value="chính thức">Chính thức</option>
            <option value="trải nghiệm">Trải nghiệm</option>
          </select>

          <select
            value={activeFilterControl}
            onChange={(e) => setActiveFilterControl(e.target.value)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Active</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            type="button"
            onClick={handleApplyFilter}
            className="flex h-10 items-center gap-1 rounded-lg border border-slate-300 bg-yellow-500 px-3 text-sm text-slate-700 transition hover:bg-yellow-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" />
            </svg>
            <span>Lọc</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex h-10 items-center gap-1 rounded-lg border border-slate-300 bg-blue-500 px-3 text-sm text-white transition hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M4 4v6h6" />
              <path d="M20 20v-6h-6" />
              <path d="M5 15a7 7 0 0 0 11.9 2.9L20 14" />
              <path d="M19 9a7 7 0 0 0-11.9-2.9L4 10" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <StudentTable
        rows={pageUsers}
        startIndex={startIndex}
        onView={(u) => openDetailModal(u, false)}
        onEdit={(u) => openDetailModal(u, true)}
        onDelete={handleDelete}
      />

      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemLabel="học viên"
      />

      {detailUser && (
        <StudentDetailModal
          user={detailUser}
          onClose={closeDetailModal}
          onSave={handleUpdateUser}
          startEdit={detailStartEdit}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa học viên"
        message={
          deleteTarget
            ? `Bạn có chắc muốn xóa học viên "${deleteTarget.fullName}" (${deleteTarget.code})?\nHành động này không thể hoàn tác.`
            : ""
        }
        confirmLabel="Xóa"
        cancelLabel="Hủy"
      />
    </div>
  );
}
