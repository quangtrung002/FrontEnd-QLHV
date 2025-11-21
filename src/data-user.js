// src/components/QLHV/data-user.js

const users = Array.from({ length: 50 }, (_, index) => {
  const i = index + 1;

  const grades = ["Lớp 3", "Lớp 4", "Lớp 5", "Lớp 6"];
  const addresses = [
    "Xóm Hạ Khê, Xã Ngọc Mỹ, Huyện Quốc Oai, Hà Nội",
    "Thôn Vân Côn, Hoài Đức, Hà Nội",
    "Phường Dịch Vọng, Cầu Giấy, Hà Nội",
    "Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
  ];

  return {
    id: i, // dùng nội bộ
    code: `GITA${String(i).padStart(4, "0")}`, // mã định danh
    fullName: `Học viên ${i}`, // họ tên học viên
    grade: grades[index % grades.length], // khối: Lớp 3/4/5/6
    dob: `201${(i % 4) + 1}-0${((i - 1) % 9) + 1}-15`, // ngày sinh demo

    fatherName: `Nguyễn Văn B${i}`, // họ và tên bố
    motherName: `Trần Thị C${i}`, // họ và tên mẹ

    status: index % 3 === 0 ? "Trải nghiệm" : "Chính thức", // trạng thái
    active: index % 5 === 0 ? "InActive" : "Active", // active / inactive

    address: addresses[index % addresses.length], // địa chỉ
    fatherPhone: `09${(10 + (i % 10)) % 10}23${String(1000 + i).slice(-3)}`, // sđt bố (demo)
    motherPhone: `09${(20 + (i % 10)) % 10}78${String(1000 + i).slice(-3)}`, // sđt mẹ (demo)

    referrer: `Người giới thiệu ${i}`, // người giới thiệu
  };
});

export default users;
