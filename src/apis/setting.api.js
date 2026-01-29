const { fetcher } = require("./fetcher");

const path = {
  getAll: "settings",
  updateSettings: "settings",
  getPermission: "settings/permission",
  updatePermission: "settings/permission",
  createManager: "settings/manager",
};

const getAllSettings = () => {
  return fetcher({
    url: path.getAll,
    method: "GET",
  });
};

const getPermission = () => {
  return fetcher({
    url: path.getPermission,
    method: "GET",
  });
};

const updateSettings = (data) => {
  return fetcher({
    url: path.updateSettings,
    method: "PUT",
    data,
  });
};

const updatePermission = (data) => {
  return fetcher({
    url: path.updatePermission,
    method: "PUT",
    data,
  });
};

const createManager = (data) => {
  return fetcher({
    url: path.createManager,
    method: "POST",
    data,
  });
};

export {
  getAllSettings,
  getPermission,
  updateSettings,
  updatePermission,
  createManager,
};
