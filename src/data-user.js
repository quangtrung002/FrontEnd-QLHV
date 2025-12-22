const users = Array.from({ length: 50 }, (_, index) => {
  const i = index + 1;

  const grades = ["Lớp 3", "Lớp 4", "Lớp 5", "Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9", "Lớp 10", "Lớp 11", "Lớp 12"];
  const addresses = [
    "Xóm Hạ Khê, Xã Ngọc Mỹ, Huyện Quốc Oai, Hà Nội",
    "Thôn Vân Côn, Hoài Đức, Hà Nội",
    "Phường Dịch Vọng, Cầu Giấy, Hà Nội",
    "Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
  ];
  const teachers = ["thầy Trung", "cô Hương", "thầy Nam", "cô Lan"];
  const comments = [
    "Con học tập tốt",
    "Cần cố gắng hơn",
    "Thái độ học tập tích cực",
    "Cần rèn luyện kỹ năng mềm",
    "Hoàn thành bài tập đầy đủ",
    "Tham gia hoạt động ngoại khóa tích cực",
    "Cần cải thiện kỹ năng giao tiếp",
    "Thái độ học tập chưa nghiêm túc",
    "Cần chú ý nghe giảng hơn",
    "Cần cải thiện kỹ năng làm việc nhóm",
    "",
    "",
    "",
  ];

  const getFeedback = (commentIndex) => {
    const content = comments[commentIndex % comments.length];
    return {
      content: content,
      status: content ? "done" : "pending" 
    };
  };

  const status = index % 3 === 0 ? "Trải nghiệm" : "Chính thức";

  let trialFeedbacks = [];
  if (status === "Trải nghiệm") {
    trialFeedbacks = Array.from({ length: 4 }, (_, k) => {
      const sessionNum = k + 1;
      const content = comments[(index + k) % comments.length] || "";
      return {
        session: sessionNum,
        date: `2025-10-${String(15 + k * 2).padStart(2, "0")}`,
        comment: content
      };
    });
  }

  const fb1 = getFeedback(index);
  const fb2 = getFeedback(index + 1);
  const fb3 = getFeedback(index + 2);

  return {
    id: i,
    code: `GITA${String(i).padStart(4, "0")}`,
    fullName: `Học viên ${i}`,
    grade: grades[index % grades.length],
    dob: `201${(i % 4) + 1}-0${((i - 1) % 9) + 1}-15`,
    fatherName: `Nguyễn Văn B${i}`,
    motherName: `Trần Thị C${i}`,
    status: status,
    address: addresses[index % addresses.length],
    fatherPhone: `09${(10 + (i % 10)) % 10}23${String(1000 + i).slice(-3)}`,
    motherPhone: `09${(20 + (i % 10)) % 10}78${String(1000 + i).slice(-3)}`,
    referrer: `Người giới thiệu ${i}`,
    assignedTeacher: teachers[index % teachers.length],
    feedbacks: [
      { week: 1, month: 10, year: 2025, ...fb1 },
      { week: 2, month: 10, year: 2025, ...fb2 },
      { week: 3, month: 10, year: 2025, ...fb3 }
    ],
    trialFeedbacks: trialFeedbacks
  };
});

export default users;