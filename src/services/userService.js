import { request } from "../configs/api";

class UserService {
	fetchUserListApi() {
		return request({
			url: "/users",
			method: "GET",
		});
	}

	loginApi(data) {
		return request({
			url: "/auth/signin",
			method: "POST",
			data,
		});
	}

	registerApi(data) {
		return request({
			url: `/auth/signup`,
			method: "POST",
			data,
		});
	}
}

export const userService = new UserService();
