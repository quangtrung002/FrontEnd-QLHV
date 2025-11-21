import React, { useMemo, useState } from "react";
import users from "data-user";
import Pagination from "services/pagination";
import LeaveModal from "./leaveModal";
import ConfirmModal from "./confirmModal";
import TdGrade from "services/tdGrade";

const initialLeaves = [
  {
    id: 1,
    userId: 1,
    studentName: "Trần Minh Khoa",
    code: "GITA0001",
    grade: "Lớp 8",
    date: "2025-10-01",
    reason: "Ốm, xin nghỉ 1 buổi để đi khám bệnh",
  },
  {
    id: 2,
    userId: 3,
    studentName: "Vũ Đức Long",
    code: "GITA0003",
    grade: "Lớp 8",
    date: "2025-10-03",
    reason: "Đi đám cưới người thân ở quê",
  },
  {
    id: 3,
    userId: 5,
    studentName: "Đặng Khánh Huyền",
    code: "GITA0005",
    grade: "Lớp 7",
    date: "2025-10-04",
    reason: "Bị sốt, bác sĩ dặn nghỉ ngơi",
  },
  {
    id: 4,
    userId: 8,
    studentName: "Ngô Thị Mai",
    code: "GITA0008",
    grade: "Lớp 3",
    date: "2025-10-06",
    reason: "Về quê làm giấy tờ với gia đình",
  },
  {
    id: 5,
    userId: 10,
    studentName: "Lý Mỹ Duyên",
    code: "GITA0010",
    grade: "Lớp 9",
    date: "2025-10-07",
    reason: "Tham gia thi văn nghệ cấp trường",
  },
  {
    id: 6,
    userId: 12,
    studentName: "Phạm Minh Hiếu",
    code: "GITA0012",
    grade: "Lớp 8",
    date: "2025-10-10",
    reason: "Đi khám mắt định kỳ",
  },
  {
    id: 7,
    userId: 15,
    studentName: "Nguyễn Văn A",
    code: "GITA0015",
    grade: "Lớp 1",
    date: "2025-10-11",
    reason: "Bận đi du lịch với gia đình",
  },
  {
    id: 8,
    userId: 18,
    studentName: "Nguyễn Thị Thu Trang",
    code: "GITA0018",
    grade: "Lớp 6",
    date: "2025-10-13",
    reason: "Đau bụng, xin nghỉ 1 buổi",
  },
  {
    id: 9,
    userId: 21,
    studentName: "Hoàng Gia Bảo",
    code: "GITA0021",
    grade: "Lớp 4",
    date: "2025-10-15",
    reason: "Đi thi cờ vua cấp quận",
  },
  {
    id: 10,
    userId: 25,
    studentName: "Lê Hải Nam",
    code: "GITA0025",
    grade: "Lớp 5",
    date: "2025-10-18",
    reason: "Bị tai nạn nhẹ, nghỉ để theo dõi thêm",
  },
];

const ITEMS_PER_PAGE = 10;

function getTodayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function LeaveTracking() {
  const [allUsers] = useState(() => users);
  const [leaves, setLeaves] = useState(initialLeaves);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [fromDateInput, setFromDateInput] = useState("");
  const [toDateInput, setToDateInput] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const openCreateModal = () => {
    setEditingLeave(null);
    setIsModalOpen(true);
  };

  const openEditModal = (leave) => {
    setEditingLeave(leave);
    setIsModalOpen(true);
  };

  const closeLeaveModal = () => {
    setIsModalOpen(false);
    setEditingLeave(null);
  };

  const handleSaveFromModal = (form) => {
    const { userId, date, reason } = form;

    if (!userId) {
      alert("Vui lòng chọn học viên.");
      return;
    }
    if (!date) {
      alert("Vui lòng chọn ngày nghỉ.");
      return;
    }
    if (!reason.trim()) {
      alert("Vui lòng nhập lý do nghỉ.");
      return;
    }

    const student = allUsers.find((u) => String(u.id) === String(userId));
    if (!student) {
      alert("Không tìm thấy học viên.");
      return;
    }

    if (editingLeave) {
      const updated = {
        ...editingLeave,
        userId: student.id,
        studentName: student.fullName,
        code: student.code,
        grade: student.grade,
        date,
        reason: reason.trim(),
      };

      setLeaves((prev) =>
        prev.map((l) => (l.id === editingLeave.id ? updated : l))
      );
    } else {
      const newLeave = {
        id: Date.now(),
        userId: student.id,
        studentName: student.fullName,
        code: student.code,
        grade: student.grade,
        date,
        reason: reason.trim(),
      };
      setLeaves((prev) => [...prev, newLeave]);
      setPage(1);
    }

    closeLeaveModal();
  };

  const handleDeleteClick = (leave) => {
    setDeleteTarget(leave);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setLeaves((prev) => prev.filter((l) => l.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  const handleApplyDateFilter = () => {
    if (fromDateInput && toDateInput && fromDateInput > toDateInput) {
      alert("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
      return;
    }
    setDateRange({ from: fromDateInput, to: toDateInput });
    setPage(1);
  };

  const filteredLeaves = useMemo(() => {
    let result = leaves;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((l) => {
        return (
          l.studentName.toLowerCase().includes(q) ||
          l.code.toLowerCase().includes(q) ||
          l.grade.toLowerCase().includes(q) ||
          l.date.toLowerCase().includes(q) ||
          l.reason.toLowerCase().includes(q)
        );
      });
    }

    if (dateRange.from || dateRange.to) {
      result = result.filter((l) => {
        const d = l.date;
        if (dateRange.from && d < dateRange.from) return false;
        if (dateRange.to && d > dateRange.to) return false;
        return true;
      });
    }

    return result;
  }, [leaves, search, dateRange]);

  const totalItems = filteredLeaves.length;
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageLeaves = filteredLeaves.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
          <button
            type="button"
            className="h-10 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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
            className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-yellow-300 transition"
          >
            Lọc
          </button>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-2 h-10 rounded-lg !bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700 transition"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-lg leading-none">
            +
          </span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border px-3 py-2 text-left">STT</th>
              <th className="border px-3 py-2 text-left">Mã định danh</th>
              <th className="border px-3 py-2 text-left">Họ tên học viên</th>
              <th className="border px-3 py-2 text-left">Khối</th>
              <th className="border px-3 py-2 text-left">Ngày nghỉ</th>
              <th className="border px-3 py-2 text-left">Lý do nghỉ</th>
              <th className="border px-3 py-2 text-left">Action</th>
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
                  <td className="border px-3 py-2">{startIndex + idx + 1}</td>
                  <td className="border px-3 py-2 font-mono text-xs">
                    {l.code}
                  </td>
                  <td className="border px-3 py-2">{l.studentName}</td>
                  <TdGrade str={l.grade} />
                  <td className="border px-3 py-2">{l.date}</td>
                  <td className="border px-3 py-2">{l.reason}</td>
                  <td className="border px-3 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(l)}
                        className="p-1 rounded hover:bg-slate-100"
                        title="Sửa"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-amber-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path d="M16.862 4.487 19.5 7.125m-2.638-2.638-8.508 8.508a4.5 4.5 0 0 0-1.2 2.164L6 18l2.841-.154a4.5 4.5 0 0 0 2.164-1.2l8.508-8.508-2.651-2.651Z" />
                          <path d="M19.5 14.25V19.5A1.5 1.5 0 0 1 18 21H4.5A1.5 1.5 0 0 1 3 19.5V6A1.5 1.5 0 0 1 4.5 4.5H9.75" />
                        </svg>
                      </button>

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
                    </div>
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
        initialData={editingLeave}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa ngày nghỉ"
        message={
          deleteTarget
            ? `Bạn có chắc muốn xóa ngày nghỉ của "${deleteTarget.studentName}" vào ngày ${deleteTarget.date}?\nHành động này không thể hoàn tác.`
            : ""
        }
        confirmLabel="Xóa"
        cancelLabel="Hủy"
      />
    </div>
  );
}
