import { request } from "../configs/api";

class DepartmentService {
<<<<<<< HEAD
	fetchDepartmentListApi() {
		return request({
			url: "/phong-thue",
			method: "GET",
		});
	}

	fetchDeleteDepartmentApi(id) {
		return request({
			url: `/phong-thue/${id}`,
			method: "DELETE",
		});
	}
=======
  fetchDepartmentListApi() {
    return request({
      url: "/phong-thue",
      method: "GET",
    });
  }

  fetchDeleteDepartmentApi(id) {
    return request({
      url: `/phong-thue/${id}`,
      method: "DELETE",
    });
  }
>>>>>>> 4539e0882f86f65d70ca9dc9b0f02cb0ccb643c9
}

export const departmentService = new DepartmentService();
