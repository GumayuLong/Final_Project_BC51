import { request } from "../configs/api";

class UserService {
<<<<<<< HEAD
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

	userInfoApi(userId) {
		return request({
			url: `/users/${userId}`,
			method: "GET",
		});
	} 
=======
  fetchUserListApi() {
    return request({
      url: "/users",
      method: "GET",
    });
  }

  fetchSearchUserApi(name) {
    return request({
      url: `users/search/${name}`,
      method: "GET",
    });
  }

  fetchDeleteUserApi(id) {
    return request({
      url: `/users/${id}`,
      method: "DELETE",
    });
  }
>>>>>>> main
}

export const userService = new UserService();
