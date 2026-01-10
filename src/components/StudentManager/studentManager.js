import React, { useState } from "react";
import StudentTable from "services/table";
import Pagination from "services/pagination";
import StudentModal from "./StudentModal";
import ConfirmModal from "./confirmModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStudent,
  deleteStudent,
  getListStudents,
  getStudentById,
  updateStudent,
} from "apis/student.api";
import useDebounce from "services/useDebounce";
import {
  notificationSuccess,
  notificationError,
} from "notification/notification";
import {
  ENROLLMEN_FIELDS,
  pickFields,
  PROFILE_FIELDS,
  USER_FIELDS,
} from "services/filterField";
import { GRADE } from "services/tdGrade";

const ITEMS_PER_PAGE = 15;

export default function StudentManager() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [gradeFilterControl, setGradeFilterControl] = useState("");
  const [statusFilterControl, setStatusFilterControl] = useState("");
  const [filters, setFilters] = useState({});
  const [isSort, setIsSort] = useState(true);
  const debouncedSearch = useDebounce(search.trim());

  const { data: response, isLoading } = useQuery({
    queryKey: ["getListStudents", page, debouncedSearch, filters, isSort],
    queryFn: () =>
      getListStudents({
        filter: filters,
        search: debouncedSearch,
        searchFields: ["student.username", "profile.code"],
        limit: ITEMS_PER_PAGE,
        page: page,
        sort: isSort ? "id" : "-id",
      }),
    keepPreviousData: true,
  });

  const { data: studentDetail } = useQuery({
    queryKey: ["getStudentById", selectedId],
    queryFn: () => getStudentById(selectedId),
    enabled: !!selectedId,
  });

  const { mutateAsync: createStudentMutation } = useMutation({
    mutationFn: createStudent,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Thêm học viên thành công");
        queryClient.invalidateQueries(["getListStudents"]);
        handleCloseModal();
      }
    },
  });

  const { mutateAsync: updateStudentMutation } = useMutation({
    mutationFn: updateStudent,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Cập nhật thông tin học viên thành công");
        queryClient.invalidateQueries(["getListStudents"]);
        handleCloseModal();
      }
    },
  });

  const { mutateAsync: deleteStudentMutation } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Xóa học viên thành công");
        queryClient.invalidateQueries(["getListStudents"]);
        handleCancelDelete();
      }
    },
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    user: null,
    mode: "view",
  });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSort = () => {
    setIsSort(!isSort);
  };

  const handleOpenCreate = () => {
    setModalState({ isOpen: true, user: null, mode: "create" });
  };

  const handleOpenView = (user) => {
    setSelectedId(user.enrollmentId);
    setModalState({ isOpen: true, user: null, mode: "view" });
  };

  const handleOpenEdit = (user) => {
    setSelectedId(user.enrollmentId);
    setModalState({ isOpen: true, user: null, mode: "edit" });
  };

  const handleCloseModal = () => {
    setSelectedId(null);
    setModalState((prev) => ({ ...prev, isOpen: false, user: null }));
  };

  const handleApplyFilter = () => {
    const newFilters = {};
    if (gradeFilterControl) newFilters["grade"] = gradeFilterControl;
    if (statusFilterControl) newFilters["studentStatus"] = statusFilterControl;

    setFilters(newFilters);
    setPage(1);
  };

  const handleSaveModal = async (formData) => {
    try {
      const userPayload = pickFields(formData, USER_FIELDS);
      const profilePayload = pickFields(formData, PROFILE_FIELDS);
      const enrollmentPayload = pickFields(formData, ENROLLMEN_FIELDS);
      const payload = {
        enrollment: enrollmentPayload,
        student: userPayload,
        profile: profilePayload,
      };

      if (modalState.mode === "edit") {
        await updateStudentMutation({
          id: formData.id,
          data: payload,
        });
      } else {
        await createStudentMutation(payload);
      }
    } catch (error) {
      notificationError(error?.msg || "Thao tác thất bại");
    }
  };

  const handleDelete = (id) => setDeleteTarget(id);
  const handleCancelDelete = () => setDeleteTarget(null);
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteStudentMutation(deleteTarget);
    } catch (error) {
      notificationError("Xóa thất bại");
    }
  };

  const listStudents = response?.data || [];
  const totalItems = listStudents.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-500">Đang tải dữ liệu...</div>
    );
  }

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
            {GRADE.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <select
            value={statusFilterControl}
            onChange={(e) => setStatusFilterControl(e.target.value)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Trạng thái</option>
            <option value="CT">Chính thức</option>
            <option value="TN">Trải nghiệm</option>
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
        rows={listStudents}
        startIndex={startIndex}
        isSort={isSort}
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
        user={studentDetail?.data}
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
            ? `Bạn có chắc muốn xóa học viên có ID ${deleteTarget} này không?\nHành động này không thể hoàn tác.`
            : ""
        }
      />
    </div>
  );
}
