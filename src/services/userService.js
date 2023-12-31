import { request } from "../configs/api";

class UserService {
  // LOGIN AND LOGOUT API
  loginApi(data) {
    return request({
      url: `/auth/signin`,
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

  // USER API

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

  fetchDeleteUserApi(id) {
    return request({
      url: `/users?id=${id}`,
      method: "DELETE",
    });
  }

  fetchUpdateUserApi(id, data) {
    return request({
      url: `/users/${id}`,
      method: "PUT",
      data,
    });
  }

  fetchUserDetailApi(id) {
    return request({
      url: `/users/${id}`,
      method: "GET",
    });
  }

  userInfoApi(userId) {
    return request({
      url: `/users/${userId}`,
      method: "GET",
    });
  }

  updateUserInfoApi(userId, data) {
    return request({
      url: `/users/${userId}`,
      method: "PUT",
      data,
    });
  }

  postAvatarApi(data) {
    return request({
      url: "/users/upload-avatar",
      method: "POST",
      data,
    });
  }
}

export const userService = new UserService();
