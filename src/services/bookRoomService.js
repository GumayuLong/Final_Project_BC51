import { request } from "../configs/api";

class BookRoomService {
    fetchBookedRoomFromUserApi(userId) {
        return request({
			url: `/dat-phong/lay-theo-nguoi-dung/${userId}/`,
			method: "GET",
		});
    }
}

export const bookRoomService = new BookRoomService();