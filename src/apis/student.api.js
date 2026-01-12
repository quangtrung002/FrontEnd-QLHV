import { fetcher } from "./fetcher";

const path = {
  getListStudents: "admin/students",
  getStudentById: "admin/students/",
  createStudent: "admin/students",
  updateStudent: "admin/students/",
  deleteStudent: "admin/students/",
  getListStudentScore: "admin/score-student", //API điểm học sinh
  updateStudentScore: "admin/score-student/",
  getListLeaveRequests: "admin/students/leave/list", // API đơn xin nghỉ học
  getListStudentDropList: "admin/students/leave/droplist",
  createLeaveRequest: "admin/students/leave",
  deleteLeaveRequest: "admin/students/leave/",
  getListStudentTrial: "admin/students/list-trial", // API lấy học sinh học trải nghiệm
  createTrialFeedback: "admin/students/trial-feedback",
  updateTrialStudent: "admin/students/trial-student/",
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
    url: path.deleteStudent + id,
    method: "DELETE",
  });
};

const getListStudentScore = ({ term, grade }) => {
  return fetcher({
    url: path.getListStudentScore,
    method: "GET",
    params: {
      term,
      grade,
    },
  });
};

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
};

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
};

const getListStudentTrial = (params) => {
  return fetcher({
    url: path.getListStudentTrial,
    method: "GET",
    params: {
      ...params,
      filter: JSON.stringify(params.filter),
    },
  });
};

const createTrialFeedback = (data) => {
  return fetcher({
    url: path.createTrialFeedback,
    method: "POST",
    data,
  });
};

const updateTrialStudent = (enrollmentId) => {
  return fetcher({
    url: path.updateTrialStudent + enrollmentId,
    method: "PUT",
  });
};

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
  getListStudentTrial,
  createTrialFeedback,
  updateTrialStudent,
};
