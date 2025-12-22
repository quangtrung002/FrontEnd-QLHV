import { useMemo, useState } from "react";
import FeedbackFilter from "./FeedbackFilter";
import FeedbackTable from "./FeedbackTable";
import FeedbackModal from "./FeedbackModal";
import usersData from "data-user";
import Pagination from "services/pagination";

const ITEMS_PER_PAGE = 15;

export default function Feedback() {
  const [data, setData] = useState(usersData);
  
  const [filter, setFilter] = useState({
    week: 1,
    month: 10,
    year: 2025,
    grade: "",
    status: ""
  });

  const [sortConfig, setSortConfig] = useState({ key: "userId", direction: "asc" });
  const [page, setPage] = useState(1);
  const [activeItem, setActiveItem] = useState(null);

  const uniqueGrades = useMemo(() => {
    const grades = data.map((u) => u.grade);
    return [...new Set(grades)].sort((a, b) => a - b);
  }, [data]);

  const truncateContent = (text, limit = 50) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  const filteredData = useMemo(() => {
    let filteredUsers = data;

    if (filter.grade) {
      filteredUsers = data.filter((u) => String(u.grade) === String(filter.grade));
    }

    let mappedData = filteredUsers.map(user => {
      const fb = user.feedbacks.find(
        (f) =>
          f.week === Number(filter.week) &&
          f.month === Number(filter.month) &&
          f.year === Number(filter.year)
      );

      return {
        userId: user.id,
        code: user.code,
        fullName: user.fullName,
        assignedTeacher: user.assignedTeacher,
        grade: user.grade,
        ...fb,
        status: fb && fb.status ? fb.status : "pending",
        shortContent: fb ? truncateContent(fb.content, 50) : ""
      };
    });

    if (filter.status) {
      mappedData = mappedData.filter(item => item.status === filter.status);
    }

    mappedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return mappedData;
  }, [data, filter, sortConfig]);

  const totalItems = filteredData.length;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const safePage = Math.min(Math.max(page, 1), totalPages);
  
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const pageRows = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (key, value) => {
    setFilter(prev => ({ ...prev, [key]: value }));
    setPage(1); 
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSave = (content) => {
    setData((prev) =>
      prev.map((user) => {
        if (user.id === activeItem.userId) {
          const exists = user.feedbacks.some(
             f => f.week === activeItem.week && f.month === activeItem.month && f.year === activeItem.year
          );

          let newFeedbacks;
          if (exists) {
            newFeedbacks = user.feedbacks.map((f) =>
              f.week === activeItem.week &&
              f.month === activeItem.month &&
              f.year === activeItem.year
                ? { 
                    ...f, 
                    content: content, 
                    status: content.trim() !== "" ? "done" : "pending" 
                  }
                : f
            );
          } else {
            newFeedbacks = [
              ...user.feedbacks,
              {
                week: activeItem.week,
                month: activeItem.month,
                year: activeItem.year,
                content: content,
                status: content.trim() !== "" ? "done" : "pending"
              }
            ];
          }

          return { ...user, feedbacks: newFeedbacks };
        }
        return user;
      })
    );
    setActiveItem(null);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center uppercase">Kết quả học tập</h1>

      <FeedbackFilter
        week={filter.week}
        month={filter.month}
        year={filter.year}
        grade={filter.grade}
        status={filter.status}
        gradeOptions={uniqueGrades}
        onChange={handleFilterChange}
        onApply={() => {}}
      />

      <FeedbackTable 
        data={pageRows} 
        startIndex={startIndex}
        sortConfig={sortConfig} 
        onSort={handleSort}     
        onInput={setActiveItem} 
      />

      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={safePage}
        onPageChange={setPage}
        itemLabel="học viên"
      />

      <FeedbackModal
        open={!!activeItem}
        data={activeItem}
        onClose={() => setActiveItem(null)}
        onSave={handleSave}
      />
    </div>
  );
}