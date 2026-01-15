import React, { useState } from "react";
import Pagination from "services/pagination";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ScoreToolbar from "./ScoreToolbar";
import ScoreTable from "./ScoreTable";
import ScoreEditModal from "./ScoreEditModal";
import {
  notificationSuccess,
  notificationError,
} from "notification/notification";
import { getListStudentScore, updateStudentScore } from "apis/student.api";

const ITEMS_PER_PAGE = 15;

export default function StudentScores() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState({
    grade: "",
    term: "1_2025_2026",
  });
  const [page, setPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["studentScores", filter.term, filter.grade],
    queryFn: () =>
      getListStudentScore({ term: filter.term, grade: filter.grade }),
  });

  const students = response?.data || [];

  const { mutateAsync: updateStudentScoreMutation } = useMutation({
    mutationFn: (data) => updateStudentScore(data),
    onSuccess: () => {
      notificationSuccess("Cập nhật điểm thành công!");
      queryClient.invalidateQueries(["studentScores", filter.term]);
      setEditingRow(null);
    },
    onError: (error) => {
      notificationError("Có lỗi xảy ra khi lưu dữ liệu.");
    },
  });

  const totalItems = students.length;
  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const pageRows = students.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const calculateSummary = (mid, gita, final) => {
    if (
      mid === "" ||
      mid === null ||
      gita === "" ||
      gita === null ||
      final === "" ||
      final === null
    )
      return 0;
    const val = (+mid + +gita + +final) / 3;
    return isNaN(val) ? 0 : val.toFixed(1);
  };

  const handleChangeFilter = (key, val) => {
    setFilter((prev) => ({
      ...prev,
      [key]: val,
    }));
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

    updateStudentScoreMutation({
      id: editingRow.enrollmentId,
      data: {
        mid_score: updatedRow.mid === "" ? null : +updatedRow.mid,
        gita_score: updatedRow.gita === "" ? null : +updatedRow.gita,
        final_score: updatedRow.final === "" ? null : +updatedRow.final,
        term : filter.term
      },
    });
  };

  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        Lỗi không tải được dữ liệu!
      </div>
    );

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center mb-4 uppercase">
        Điểm học viên
      </h1>

      <ScoreToolbar
        term={filter.term}
        grade={filter.grade}
        handleChangeFilter={handleChangeFilter}
      />

      {isLoading ? (
        <div className="text-center py-10 text-slate-500">
          Đang tải dữ liệu...
        </div>
      ) : (
        <ScoreTable
          rows={pageRows}
          onEdit={(row) => setEditingRow(row)}
          calculateSummary={calculateSummary}
        />
      )}

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
        term={filter.term}
        onClose={() => setEditingRow(null)}
        onSave={handleSaveScore}
        calculateSummary={calculateSummary}
      />
    </div>
  );
}
