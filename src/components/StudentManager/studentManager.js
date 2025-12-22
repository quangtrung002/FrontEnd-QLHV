import React, { useState, useMemo } from "react";
import users from "data-user";
import StudentTable from "services/table";
import Pagination from "services/pagination";
import StudentModal from "./StudentModal";
import ConfirmModal from "./confirmModal";

const ITEMS_PER_PAGE = 15;

export default function StudentManager() {
  const [allUsers, setAllUsers] = useState(() => users);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [gradeFilterControl, setGradeFilterControl] = useState("");
  const [statusFilterControl, setStatusFilterControl] = useState("");
  const [filters, setFilters] = useState({ grade: "", status: "" });

  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const [modalState, setModalState] = useState({
    isOpen: false,
    user: null,
    mode: "view",
  });

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

    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [allUsers, search, filters, sortConfig]);

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

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleApplyFilter = () => {
    setFilters({ grade: gradeFilterControl, status: statusFilterControl });
    setPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleOpenCreate = () => {
    setModalState({ isOpen: true, user: null, mode: "create" });
  };

  const handleOpenView = (user) => {
    setModalState({ isOpen: true, user: user, mode: "view" });
  };

  const handleOpenEdit = (user) => {
    setModalState({ isOpen: true, user: user, mode: "edit" });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSaveModal = (formData) => {
    if (formData.id) {
      setAllUsers((prev) =>
        prev.map((u) => (u.id === formData.id ? { ...u, ...formData } : u))
      );
    } else {
      const nextId =
        allUsers.length > 0
          ? Math.max(...allUsers.map((u) => u.id || 0)) + 1
          : 1;
      const nextCode = `GITA${String(allUsers.length + 1).padStart(4, "0")}`;

      const newUser = {
        ...formData,
        id: nextId,
        code: nextCode,
        feedbacks: [],
      };

      setAllUsers((prev) => [...prev, newUser]);
      setPage(1);
    }
    handleCloseModal();
  };

  const handleDelete = (user) => setDeleteTarget(user);
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setAllUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    setDeleteTarget(null);
  };
  const handleCancelDelete = () => setDeleteTarget(null);

  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-bold uppercase">
        Quản lý học viên
      </h1>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              className="h-10 w-64 rounded-lg border border-slate-300 pl-3 pr-8 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Tìm theo tên, mã, phụ huynh..."
            />
          </div>

          <select
            value={gradeFilterControl}
            onChange={(e) => setGradeFilterControl(e.target.value)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Khối</option>
            {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
              <option key={g} value={`Lớp ${g}`}>{`Lớp ${g}`}</option>
            ))}
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

          <button
            type="button"
            onClick={handleApplyFilter}
            className="flex h-10 items-center gap-1 rounded-lg border border-slate-300 bg-yellow-500 px-4 text-sm font-semibold text-slate-800 transition hover:bg-yellow-400"
          >
            <span>Lọc</span>
          </button>
        </div>

        <div>
          <button
            onClick={handleOpenCreate}
            className="h-10 rounded-lg bg-green-600 px-4 text-sm font-semibold text-white transition shadow-sm hover:bg-green-700"
          >
            + Thêm mới
          </button>
        </div>
      </div>

      <StudentTable
        rows={pageUsers}
        startIndex={startIndex}
        sortConfig={sortConfig}
        onSort={handleSort}
        onView={handleOpenView}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemLabel="học viên"
      />

      <StudentModal
        isOpen={modalState.isOpen}
        user={modalState.user}
        mode={modalState.mode}
        onClose={handleCloseModal}
        onSave={handleSaveModal}
      />

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
      />
    </div>
  );
}
