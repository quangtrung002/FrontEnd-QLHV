import { fetcher } from "./fetcher";

const path = {
  getListStudents: "admin/users",
  getStudentById: "admin/users/",
  createStudent: "admin/students",
  updateStudent: "admin/students/",
  deleteStudent: "admin/users/lock",
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

export {
  getListStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
