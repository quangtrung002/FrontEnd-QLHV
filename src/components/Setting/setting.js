import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Save,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Users,
  Edit,
  X,
} from "lucide-react";
import {
  notificationSuccess,
  notificationError,
} from "notification/notification";
import {
  getAllSettings,
  getPermission,
  updateSettings,
  createManager,
  updatePermission,
} from "apis/setting.api";

const LIST_YEARS = [
  "2025-2026",
  "2026-2027",
  "2027-2028",
  "2028-2029",
  "2029-2030",
];

const ROLES = [
  { value: "SuperAdmin", label: "Super Admin" },
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
];

export default function Setting() {
  const queryClient = useQueryClient();

  const [currentYear, setCurrentYear] = useState({
    year: "",
    startDate: "",
    endDate: "",
  });
  const [shifts, setShifts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "Manager",
  });

  const { data: response, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getAllSettings,
  });
  const settings = response?.data;

  const { data: responseManager } = useQuery({
    queryKey: ["user-manager"],
    queryFn: getPermission,
  });
  const users = responseManager?.data || [];

  useEffect(() => {
    if (settings) {
      setCurrentYear({
        year: settings.currentYear?.year || "",
        startDate: settings.currentYear?.startDate || "",
        endDate: settings.currentYear?.endDate || "",
      });

      if (Array.isArray(settings.shifts)) {
        setShifts(
          settings.shifts.map((s, index) => ({
            ...s,
            tempId: Date.now() + index,
          })),
        );
      }
    }
  }, [settings]);

  const mutationSettings = useMutation({
    mutationFn: (payload) => updateSettings(payload),
    onSuccess: () => {
      notificationSuccess("Cập nhật cấu hình thành công!");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: () => {
      notificationError("Lỗi khi lưu cấu hình!");
    },
  });

  const mutationCreateUser = useMutation({
    mutationFn: (payload) => createManager(payload),
    onSuccess: () => {
      notificationSuccess("Thêm quản trị viên thành công!");
      queryClient.invalidateQueries(["user-manager"]);
      handleCloseModal();
    },
    onError: (err) => {
      notificationError("Lỗi khi thêm người dùng!");
    },
  });

  const mutationUpdatePermission = useMutation({
    mutationFn: (payload) => updatePermission(payload),
    onSuccess: () => {
      notificationSuccess("Cập nhật quyền thành công!");
      queryClient.invalidateQueries(["user-manager"]);
      handleCloseModal();
    },
    onError: () => {
      notificationError("Lỗi khi cập nhật!");
    },
  });

  const handleAddShift = () => {
    setShifts([...shifts, { tempId: Date.now(), name: "" }]);
  };

  const handleRemoveShift = (tempId) => {
    setShifts(shifts.filter((s) => s.tempId !== tempId));
  };

  const handleChangeShiftName = (tempId, rawValue) => {
    const cleanValue = rawValue.replace(/\s/g, "");
    setShifts(
      shifts.map((s) => (s.tempId === tempId ? { ...s, name: cleanValue } : s)),
    );
  };

  const handleSaveSettings = () => {
    const payload = {
      currentYear: {
        year: currentYear.year,
        startDate: currentYear.startDate,
        endDate: currentYear.endDate,
      },
      shifts: shifts
        .filter((item) => item.name.trim() !== "")
        .map((item) => ({ name: item.name })),
    };
    mutationSettings.mutate(payload);
  };

  const handleOpenModalAdd = () => {
    setEditingUser(null);
    setFormData({ username: "", email: "", role: "Manager" });
    setIsModalOpen(true);
  };

  const handleOpenModalEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Bạn có chắc muốn xóa tài khoản ${user.username}?`)) {
      const payload = {
        userId: user.id,
        status: 7,
      };
      mutationUpdatePermission.mutate(payload);
    }
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (editingUser) {
      const payload = [
        {
          username: formData.username,
          role: formData.role,
        },
      ];
      mutationUpdatePermission.mutate(payload);
    } else {
      const payload = {
        username: formData.username,
        email: formData.email,
        role: formData.role,
      };
      mutationCreateUser.mutate(payload);
    }
  };

  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500">Đang tải cấu hình...</div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-8 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 uppercase">
          Cấu hình hệ thống
        </h1>
        <button
          onClick={handleSaveSettings}
          disabled={mutationSettings.isPending}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg transition-all disabled:opacity-50"
        >
          <Save size={18} />
          {mutationSettings.isPending ? "Đang lưu..." : "Lưu thay đổi hệ thống"}
        </button>
      </div>

      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Calendar className="text-blue-600" size={20} />
          <h2 className="font-semibold text-gray-700">Năm học hiện tại</h2>
        </div>

        <div className="p-6 space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Niên khóa
            </label>
            <select
              value={currentYear.year}
              onChange={(e) =>
                setCurrentYear({ ...currentYear, year: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                -- Chọn năm học --
              </option>
              {LIST_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                value={currentYear.startDate}
                onChange={(e) =>
                  setCurrentYear({ ...currentYear, startDate: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày kết thúc
              </label>
              <input
                type="date"
                value={currentYear.endDate}
                onChange={(e) =>
                  setCurrentYear({ ...currentYear, endDate: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            * Năm học hiện tại:{" "}
            <strong>{settings?.currentYear?.year || "Chưa thiết lập"}</strong>
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="text-orange-500" size={20} />
            <h2 className="font-semibold text-gray-700">Danh sách Ca dạy</h2>
          </div>
          <button
            onClick={handleAddShift}
            className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-3 py-1 rounded-full transition-colors"
          >
            <Plus size={16} /> Thêm ca
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {shifts.map((shift) => (
              <div
                key={shift.tempId}
                className="grid grid-cols-12 gap-4 items-center bg-gray-50/50 p-2 rounded-lg"
              >
                <div className="col-span-10">
                  <input
                    type="text"
                    value={shift.name}
                    placeholder="VD: 17:00-18:30"
                    onChange={(e) =>
                      handleChangeShiftName(shift.tempId, e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() => handleRemoveShift(shift.tempId)}
                    className="text-gray-400 hover:text-red-500 p-2 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {shifts.length === 0 && (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-100 rounded-lg mt-2">
              Chưa có ca dạy nào. Hãy bấm "Thêm ca".
            </div>
          )}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="text-purple-600" size={20} />
            <h2 className="font-semibold text-gray-700">Phân quyền quản trị</h2>
          </div>
          <button
            onClick={handleOpenModalAdd}
            className="text-sm flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            <Plus size={16} /> Thêm người
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">
                    Email
                  </th>
                  <th className="px-4 py-3 font-semibold">Username</th>
                  <th className="px-4 py-3 font-semibold">Vai trò</th>
                  <th className="px-4 py-3 font-semibold text-right rounded-tr-lg">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {user.username}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "SuperAdmin"
                            ? "bg-red-100 text-red-800"
                            : user.role === "Admin"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenModalEdit(user)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Sửa"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      Chưa có quản trị viên nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 text-lg">
                {editingUser ? "Chỉnh sửa thông tin" : "Thêm quản trị viên mới"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Nhập tên đăng nhập..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  disabled={!!editingUser}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${editingUser ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
                  placeholder="admin@example.com"
                />
                {editingUser && (
                  <p className="text-xs text-gray-400 mt-1">
                    Không thể thay đổi email khi chỉnh sửa.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vai trò
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={
                    mutationCreateUser.isPending ||
                    mutationUpdatePermission.isPending
                  }
                  className="flex-1 px-4 py-2 !bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium shadow-md transition-colors disabled:opacity-70"
                >
                  {editingUser ? "Lưu thay đổi" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
