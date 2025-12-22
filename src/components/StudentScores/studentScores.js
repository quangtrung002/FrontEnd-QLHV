import React, { useState, useMemo } from "react";
import users from "data-user";
import Pagination from "services/pagination";

import ScoreToolbar from "./ScoreToolbar";
import ScoreTable from "./ScoreTable";
import ScoreEditModal from "./ScoreEditModal";
import {
  notificationSuccess,
  notificationError,
  notificationWarning,
} from "notification/notification";

const ITEMS_PER_PAGE = 15;

export default function StudentScores() {
  const [termControl, setTermControl] = useState("1_2025_2026");
  const [context, setContext] = useState({
    year: "2025-2026",
    term: "1_2025_2026",
  });
  const [rows, setRows] = useState(() =>
    users.map((u, index) => ({
      id: u.id ?? index + 1,
      fullName: u.fullName,
      grade: u.grade,
      mid: "",
      gita: "",
      final: "",
      summary: "",
    }))
  );
  const [filterGrade, setFilterGrade] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [page, setPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null); 

  const uniqueGrades = useMemo(() => {
    const grades = rows.map((r) => r.grade);
    return [...new Set(grades)].sort((a, b) => a - b);
  }, [rows]);

  const processedRows = useMemo(() => {
    let result = rows;
    if (filterGrade) {
      result = result.filter((r) => String(r.grade) === String(filterGrade));
    }
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [rows, filterGrade, sortConfig]);

  // Pagination Logic
  const totalItems = processedRows.length;
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const pageRows = processedRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Helper Functions
  const calculateSummary = (mid, gita, final) => {
    const val = (+mid + +gita + +final) / 3;
    return isNaN(val) ? 0 : val.toFixed(1);
  };

  const handleApplyContext = () => {
    setContext({ term: termControl });
    setPage(1);
    notificationSuccess(`Đã chuyển sang dữ liệu ${termControl}`);
  };

  const handleFilterGradeChange = (val) => {
    setFilterGrade(val);
    setPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSaveScore = (updatedRow) => {
    if (
      updatedRow.mid < 0 ||
      updatedRow.mid > 10 ||
      updatedRow.gita < 0 ||
      updatedRow.gita > 10 ||
      updatedRow.final < 0 ||
      updatedRow.final > 10
    ) {
      notificationError("Điểm số không hợp lệ (phải từ 0 - 10)");
      return;
    }

    try {
      setRows((prev) =>
        prev.map((r) => (r.id === updatedRow.id ? updatedRow : r))
      );
      notificationSuccess(
        `Cập nhật điểm cho ${updatedRow.fullName} thành công!`
      );
      setEditingRow(null);
    } catch (error) {
      console.error(error);
      notificationError("Có lỗi xảy ra khi lưu dữ liệu.");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center mb-4 uppercase">
        Điểm học viên
      </h1>

      <ScoreToolbar
        termControl={termControl}
        setTermControl={setTermControl}
        onApply={handleApplyContext}
        filterGrade={filterGrade}
        setFilterGrade={handleFilterGradeChange}
        uniqueGrades={uniqueGrades}
        contextTerm={context.term}
      />

      <ScoreTable
        rows={pageRows}
        sortConfig={sortConfig}
        onSort={handleSort}
        onEdit={(row) => setEditingRow(row)}
        calculateSummary={calculateSummary}
      />

      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={safePage}
        onPageChange={setPage}
        itemLabel="học viên"
      />

      <ScoreEditModal
        isOpen={!!editingRow}
        initialData={editingRow}
        term={context.term}
        onClose={() => setEditingRow(null)}
        onSave={handleSaveScore}
        calculateSummary={calculateSummary}
      />
    </div>
  );
}
