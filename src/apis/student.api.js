import { fetcher } from "./fetcher";

const path = {
  getListStudents: "admin/users",
  getStudentById: "admin/users/",
  createStudent: "admin/students",
  updateStudent: "admin/students/",
  deleteStudent: "admin/users/lock",
  getListStudentScore : "admin/students/scores",
  updateStudentScore : "admin/students/scores/"
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

export {
  getListStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getListStudentScore,
  updateStudentScore,
};
