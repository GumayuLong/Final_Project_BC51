import { request } from "../configs/api";

class BookedManageService {
  fetchBookedRoomListApi() {
    return request({
      url: "/dat-phong",
      method: "GET",
    });
  }
}

export const bookedManageService = new BookedManageService();
