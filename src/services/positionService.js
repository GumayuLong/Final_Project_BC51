import { request } from "../configs/api";

class PositionService {
<<<<<<< HEAD
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
=======
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
>>>>>>> 4539e0882f86f65d70ca9dc9b0f02cb0ccb643c9
}

export const positionService = new PositionService();
