import React, { useReducer, useState } from "react";
import Pagination from "services/pagination";
import TrialTable from "./TrialTable";
import TrialFeedbackModal from "./TrialFeedbackModal";
import ConfirmModal from "./ConfirmModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTrialFeedback,
  getListStudentTrial,
  updateTrialStudent,
} from "apis/student.api";
import useDebounce from "services/useDebounce";
import {
  notificationError,
  notificationSuccess,
} from "notification/notification";

const ITEMS_PER_PAGE = 10;

const initialModalState = {
  feedback: {
    isOpen: false,
    data: null,
  },
  confirm: {
    isOpen: false,
    user: null,
  },
};

function modalReducer(state, action) {
  switch (action.type) {
    case "OPEN_FEEDBACK":
      return { ...state, feedback: { isOpen: true, data: action.payload } };
    case "CLOSE_FEEDBACK":
      return { ...state, feedback: { isOpen: false, data: null } };
    case "OPEN_CONFIRM":
      return { ...state, confirm: { isOpen: true, user: action.payload } };
    case "CLOSE_CONFIRM":
      return { ...state, confirm: { isOpen: false, user: null } };
    default:
      return state;
  }
}

export default function TrialManager() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isSortAsc, setIsSortAsc] = useState(true);
  const [modal, dispatchModal] = useReducer(modalReducer, initialModalState);

  const debouncedSearch = useDebounce(search.trim(), 800);

  const { data: response, isLoading } = useQuery({
    queryKey: ["listStudentTrial", { search: debouncedSearch, sort: isSortAsc }],
    queryFn: () =>
      getListStudentTrial({
        sort: isSortAsc ? "id" : "-id",
        search: debouncedSearch,
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const studentTrials = response?.data || [];

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["listStudentTrial"] });
    queryClient.invalidateQueries({ queryKey: ["getListStudents"] });
  };

  const { mutate: createFeedback } = useMutation({
    mutationFn: createTrialFeedback,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Đã thêm nhận xét!");
        invalidateAll();
        dispatchModal({ type: "CLOSE_FEEDBACK" });
      }
    },
    onError: (err) => notificationError(err.msg),
  });

  const { mutate: updateOfficial } = useMutation({
    mutationFn: updateTrialStudent,
    onSuccess: (res) => {
      if (res.success) {
        notificationSuccess("Đã chuyển thành công!");
        invalidateAll();
        dispatchModal({ type: "CLOSE_CONFIRM" });
      }
    },
    onError: (err) => notificationError(err.msg),
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSort = () => setIsSortAsc((prev) => !prev);

  const handleOpenFeedback = (user, sessionNum) => {
    console.log(user)
    dispatchModal({
      type: "OPEN_FEEDBACK",
      payload: {
        enrollmentId: user.enrollmentId,
        userId: user.studentId,
        username: user.username,
        session: sessionNum,
        currentData: user.feedbacks?.find((f) => f.session === sessionNum),
      },
    });
  };

  const handleSaveFeedback = ({ enrollmentId, session, comment, date }) => {
    createFeedback({
      enrollmentId,
      sessionNumber: +session,
      learningDate: date,
      comment,
    });
  };

  const handleConfirmOfficial = () => {
    const target = modal.confirm.user;
    if (target) updateOfficial(target.enrollmentId);
  };

  const totalItems = studentTrials.length;
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageUsers = studentTrials.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-500">Đang tải dữ liệu...</div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <h1 className="text-center text-2xl font-bold uppercase">
        Quản lý học viên trải nghiệm
      </h1>

      <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="h-10 w-64 rounded-lg border border-slate-300 px-3 text-sm outline-none"
          placeholder="Tìm theo tên hoặc mã học viên..."
        />
        <div className="text-sm text-slate-600">
          Tổng số:{" "}
          <span className="font-bold text-blue-600">{totalItems}</span> học viên
        </div>
      </div>

      <TrialTable
        data={pageUsers}
        startIndex={startIndex}
        onSort={handleSort}
        onOpenFeedback={handleOpenFeedback}
        onConfirmOfficial={(user) =>
          dispatchModal({ type: "OPEN_CONFIRM", payload: user })
        }
      />

      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        itemLabel="học viên"
        onPageChange={setPage}
      />

      <TrialFeedbackModal
        isOpen={modal.feedback.isOpen}
        data={modal.feedback.data}
        onClose={() => dispatchModal({ type: "CLOSE_FEEDBACK" })}
        onSave={handleSaveFeedback}
      />

      <ConfirmModal
        isOpen={modal.confirm.isOpen}
        user={modal.confirm.user}
        onClose={() => dispatchModal({ type: "CLOSE_CONFIRM" })}
        onConfirm={handleConfirmOfficial}
        title="Xác nhận chuyển chính thức"
        message={
          modal.confirm.user
            ? `Chuyển học viên "${modal.confirm.user.username}" sang chính thức?`
            : ""
        }
        confirmLabel="Chuyển ngay"
      />
    </div>
  );
}
