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

  fetchDeletePositionApi(id) {
    return request({
      url: `/vi-tri/${id}`,
      method: "DELETE",
    });
  }
}

export const positionService = new PositionService();
