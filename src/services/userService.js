import { request } from "../configs/api";

class UserService {
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

	fetchCreateUserApi(data) {
		return request({
			url: "/users",
			method: "POST",
			data,
		});
	}

	// fetchUploadAvatarApi() {
	//   return request({
	//     url: "/users/upload-avatar",
	//     method: "POST",
	//   });
	// }

	fetchDeleteUserApi(id) {
		return request({
			url: `/users/${id}`,
			method: "DELETE",
		});
	}

	loginApi(data) {
		return request({
			url: "/auth/signin",
			method: "POST",
			data,
		});
	}

	fetchUpdateUserApi(id) {
		return request({
			url: `/users?id=${id}`,
			method: "PUT",
		});
	}

	fetchUserDetailApi(id) {
		return request({
			url: `/users/${id}`,
			method: "GET",
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
<<<<<<< HEAD
	}
=======
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
