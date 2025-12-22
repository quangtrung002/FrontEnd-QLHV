import React, { useMemo, useState } from "react";
import usersData from "data-user";
import Pagination from "services/pagination";
import TrialTable from "./TrialTable";
import TrialFeedbackModal from "./TrialFeedbackModal";
import ConfirmModal from "./ConfirmModal";

const ITEMS_PER_PAGE = 10;

export default function TrialManager() {
  const [users, setUsers] = useState(usersData);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    userId: null,
    studentName: "",
    session: 0,
    currentData: null,
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    user: null,
  });

  const processedUsers = useMemo(() => {
    let result = users.filter((u) => u.status === "Trải nghiệm");

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.fullName.toLowerCase().includes(q) ||
          u.code.toLowerCase().includes(q)
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
  }, [users, search, sortConfig]);

  const totalItems = processedUsers.length;
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageUsers = processedUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleOpenFeedback = (user, sessionNum) => {
    const existingData = user.trialFeedbacks?.find(
      (f) => f.session === sessionNum
    );
    setFeedbackModal({
      isOpen: true,
      userId: user.id,
      studentName: user.fullName,
      session: sessionNum,
      currentData: existingData || null,
    });
  };

  const handleSaveFeedback = ({ userId, session, date, comment }) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;

        const oldFeedbacks = u.trialFeedbacks || [];
        const otherFeedbacks = oldFeedbacks.filter(
          (f) => f.session !== session
        );

        const newFeedbacks = [
          ...otherFeedbacks,
          { session, date, comment },
        ].sort((a, b) => a.session - b.session);

        return { ...u, trialFeedbacks: newFeedbacks };
      })
    );
    setFeedbackModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleRequestOfficial = (user) => {
    setConfirmModal({
      isOpen: true,
      user: user,
    });
  };

  const handleConfirmOfficial = () => {
    const targetUser = confirmModal.user;
    if (!targetUser) return;

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === targetUser.id) {
          return {
            ...u,
            status: "Chính thức",
            trialFeedbacks: [],
          };
        }
        return u;
      })
    );

    setConfirmModal({ isOpen: false, user: null });
  };

  return (
    <div className="w-full space-y-6">
      <h1 className="text-center text-2xl font-bold uppercase">
        Quản lý học viên trải nghiệm
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            className="h-10 w-64 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tìm theo tên hoặc mã học viên..."
          />
        </div>
        <div className="text-sm text-slate-600">
          Tổng số: <span className="font-bold text-blue-600">{totalItems}</span>{" "}
          học viên
        </div>
      </div>

      <TrialTable
        data={pageUsers}
        startIndex={startIndex}
        sortConfig={sortConfig}
        onSort={handleSort}
        onOpenFeedback={handleOpenFeedback}
        onConfirmOfficial={handleRequestOfficial}
      />

      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setPage}
        itemLabel="học viên"
      />

      <TrialFeedbackModal
        isOpen={feedbackModal.isOpen}
        data={feedbackModal}
        onClose={() => setFeedbackModal((prev) => ({ ...prev, isOpen: false }))}
        onSave={handleSaveFeedback}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, user: null })}
        onConfirm={handleConfirmOfficial}
        title="Xác nhận chuyển chính thức"
        message={
          confirmModal.user
            ? `Bạn có chắc chắn muốn chuyển học viên "${confirmModal.user.fullName}" sang trạng thái Chính thức không?`
            : ""
        }
        confirmLabel="Chuyển ngay"
      />
    </div>
  );
}
