import { request } from "../configs/api";
class RoomService {
  fetchRoomListApi() {
    return request({
      url: "/phong-thue",
      method: "GET",
    });
  }
  fetchRoomLocateApi(locate) {
    return request({
      url: `/phong-thue/lay-phong-theo-vi-tri?maViTri=${locate}`,
      method: "GET",
    });
  }
  
}
export const roomService = new RoomService();
