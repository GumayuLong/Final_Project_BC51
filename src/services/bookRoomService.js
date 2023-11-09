import { request } from "../configs/api";

class BookRoomService {
    fetchBookedRoomFromUserApi(userId) {
        return request({
			url: `/dat-phong/lay-theo-nguoi-dung/${userId}/`,
			method: "GET",
		});
    }

    bookInfoApi(id){
        return request({
			url: `/phong-thue/${id}`,
			method: "GET",
		});
    }

    fetchRoomBooked() {
      return request({
			url: `/phong-thue`,
			method: "GET",
		});
    }
}

export const bookRoomService = new BookRoomService();