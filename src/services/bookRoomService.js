/** @format */

import { request } from "../configs/api";

class BookRoomService {
	fetchBookedRoomFromUserApi(userId) {
		return request({
			url: `/dat-phong/lay-theo-nguoi-dung/${userId}/`,
			method: "GET",
		});
	}

	fetchListBookedRoomApi() {
		return request({
			url: "/dat-phong",
			method: "GET",
		});
	}

	bookRoomApi(data) {
		return request({
			url: "/dat-phong",
			method: "POST",
      data
		});
	}
}

export const bookRoomService = new BookRoomService();
