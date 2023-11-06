import { request } from "../configs/api";

class DepartmentService {
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
}

export const departmentService = new DepartmentService();
