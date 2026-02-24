const { fetcher } = require("./fetcher");

const path = {
  getListTeachersDropList: "admin/teachers/",
  getListTeachers: "admin/teachers/list",
  createTeacher: "admin/teachers",
  updateTeacher: "admin/teachers/",
  createAbsence: "admin/teachers/absence",
  deleteAbsence: "admin/teachers/absence/",
  deleteTeacher: "admin/teachers/",
  putAttandance: "admin/teachers/attendance",
};

const getListTeachers = () => {
  return fetcher({
    url: path.getListTeachersDropList,
    method: "GET",
  });
};

const getAllTeachers = (params) => {
  return fetcher({
    url: path.getListTeachers,
    method: "GET",
    params: {
      ...params,
      filter: JSON.stringify(params.filter),
    },
  });
};

const createTeacher = (data) => {
  return fetcher({
    url: path.createTeacher,
    method: "POST",
    data,
  });
};

const updateTeacher = ({ id, data }) => {
  return fetcher({
    url: path.updateTeacher + id,
    method: "PUT",
    data,
  });
};

const createAbsence = (data) => {
  return fetcher({
    url: path.createAbsence,
    method: "POST",
    data,
  });
};

const deleteAbsence = (id) => {
  return fetcher({
    url: path.deleteAbsence + id,
    method: "DELETE",
  });
};

const deleteTeacher = (id) => {
  return fetcher({
    url: path.deleteTeacher + id,
    method: "DELETE",
  });
};

const putAttandance = (data) => {
  return fetcher({
    url: path.putAttandance,
    method: "PUT",
    data,
  });
};

export {
  getListTeachers,
  createTeacher,
  updateTeacher,
  getAllTeachers,
  createAbsence,
  deleteAbsence,
  deleteTeacher,
  putAttandance,
};
