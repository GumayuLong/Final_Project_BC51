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

  fetchDeleteUserApi(id) {
    return request({
      url: `/users/${id}`,
      method: "DELETE",
    });
  }
}

export const userService = new UserService();
