import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FeedbackFilter from "./FeedbackFilter";
import FeedbackTable from "./FeedbackTable";
import FeedbackModal from "./FeedbackModal";
import Pagination from "services/pagination";
import { getOfficialStudentFeedback } from "apis/student.api";

const ITEMS_PER_PAGE = 15;

export default function Feedback() {
  const [page, setPage] = useState(1);
  const [activeItem, setActiveItem] = useState(null);

  const [filter, setFilter] = useState({
    week: 1,
    grade: "",
    status: "",
  });

  const { data: response, isLoading } = useQuery({
    queryKey: ["officialFeedback", filter.week, filter.grade, filter.status],
    queryFn: () =>
      getOfficialStudentFeedback({
        filter: {
          week: filter.week,
          grade: filter.grade,
          status: filter.status,
        },
      }),
  });

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const rows = response?.data || [];
  const totalItems = rows.length || 0;

  const totalPages =
    totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageLeaves = rows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center uppercase">
        Kết quả học tập
      </h1>

      <FeedbackFilter
        {...filter}
        onChange={handleFilterChange}
        onApply={() => {}}
      />

      <FeedbackTable
        data={pageLeaves}
        onInput={setActiveItem}
        loading={isLoading}
      />

      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemLabel="học viên"
      />

      <FeedbackModal
        open={!!activeItem}
        data={activeItem}
        onClose={() => setActiveItem(null)}
        onSave={() => {}}
      />
    </div>
  );
}
