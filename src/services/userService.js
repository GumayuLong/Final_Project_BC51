import { request } from "../configs/api";

class UserService {
	fetchUserListApi() {
		return request({
			url: "/users",
			method: "GET",
		});
	}
}

export const userService = new UserService();
