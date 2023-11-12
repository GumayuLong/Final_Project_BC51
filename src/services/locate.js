import { request } from "../configs/api";

class LocateService{
 fetchLocateDetailApi(){
  return request({
   url:"/vi-tri",
   method:"GET"
  })
 }
 fetchLocateApi(id){
  return request({
   url:`/vi-tri/${id}`,
   method:"GET"
  })
 }
}
export const locateService = new LocateService()