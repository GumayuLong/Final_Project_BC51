import { request } from "../configs/api";

class DepartmentService {
  fetchDepartmentListApi() {
    return request({
      url: "/phong-thue",
      method: "GET",
    });
  }

  fetchCreateDepartmentApi(data) {
    return request({
      url: `/phong-thue`,
      method: "POST",
      data,
    });
  }

  fetchDepartmentDetailApi(id) {
    return request({
      url: `/phong-thue/${id}`,
      method: "GET",
    });
  }

  fetchUpdateDepartmentApi(id, data) {
    return request({
      url: `/phong-thue/${id}`,
      method: "PUT",
      data,
    });
  }

  fetchDeleteDepartmentApi(id) {
    return request({
      url: `/phong-thue/${id}`,
      method: "DELETE",
    });
  }

  uploadImageApi(id) {
    return request({
      url: `/phong-thue/upload-hinh-phong?maPhong=${id}`,
      method: "POST",
    });
  }
}

export const departmentService = new DepartmentService();
