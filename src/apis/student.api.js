import { fetcher } from "./fetcher";

const path = {
  getListStudents: "admin/users",
  getStudentById: "admin/users/",
  createStudent: "admin/students",
  updateStudent: "admin/students/",
  deleteStudent: "admin/users/lock",
  getListStudentScore : "admin/students/scores", //API điểm học sinh
  updateStudentScore : "admin/students/scores/",
  getListLeaveRequests : "admin/students/leave-requests", // API đơn xin nghỉ học 
  getListStudentDropList : "admin/students/list",
  createLeaveRequest : "admin/students/leave-requests",
  deleteLeaveRequest : "admin/students/leave-requests/",
};

const getListStudents = (params) => {
  return fetcher({
    url: path.getListStudents,
    method: "GET",
    params: {
      ...params,
      filter: JSON.stringify(params.filter),
    },
  });
};

const createStudent = (data) => {
  return fetcher({
    url: path.createStudent,
    method: "POST",
    data,
  });
};

const getStudentById = (id) => {
  return fetcher({
    url: path.getStudentById + `${id}`,
    method: "GET",
  });
};

const updateStudent = ({ id, data }) => {
  return fetcher({
    url: path.updateStudent + id,
    method: "PUT",
    data,
  });
};

const deleteStudent = (id) => {
  return fetcher({
    url: path.deleteStudent,
    method: "PUT",
    data: { userId: [id], status : 7 },
  });
};

const getListStudentScore = ({ term, grade }) => {
  return fetcher({
    url: path.getListStudentScore,
    method: "GET",
    params: {
      term,
      grade
    },
  });
}

const updateStudentScore = ({ id, data }) => {
  return fetcher({
    url: path.updateStudentScore + id,  
    method: "PUT",
    data,
  });
};

const getListLeaveRequests = (params) => {
  return fetcher({
    url: path.getListLeaveRequests,
    method: "GET",
    params: {
      ...params,
      filter: JSON.stringify(params.filter),
    },
  });
};

const getListStudentDropList = () => {
  return fetcher({
    url: path.getListStudentDropList,
    method: "GET",
  });
}

const createLeaveRequest = (data) => {
  return fetcher({
    url: path.createLeaveRequest,
    method: "POST",
    data,
  });
};

const deleteLeaveRequest = (id) => {
  return fetcher({
    url: path.deleteLeaveRequest + id,
    method: "DELETE",
  });
}

export {
  getListStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getListStudentScore,
  updateStudentScore,
  getListLeaveRequests,
  getListStudentDropList,
  createLeaveRequest,
  deleteLeaveRequest,
};
