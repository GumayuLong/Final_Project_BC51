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
      url: `/users?id=${id}`,
      method: "DELETE",
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
}

export const userService = new UserService();
