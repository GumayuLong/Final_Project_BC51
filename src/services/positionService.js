import { request } from "../configs/api";

class PositionService {
  fetchPositionListApi() {
    return request({
      url: "/vi-tri",
      method: "GET",
    });
  }

  fetchCreatePositionApi(data) {
    return request({
      url: "/vi-tri",
      method: "POST",
      data: data,
    });
  }
  fetchPositionDetailApi(id) {
    return request({
      url: `/vi-tri/${id}`,
      method: "GET",
    });
  }

  fetchUpdatePositionApi(id, data) {
    return request({
      url: `/vi-tri/${id}`,
      method: "PUT",
      data,
    });
  }

  fetchDeletePositionApi(id) {
    return request({
      url: `/vi-tri/${id}`,
      method: "DELETE",
    });
  }
}

export const positionService = new PositionService();
