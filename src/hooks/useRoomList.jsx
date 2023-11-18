import React, { useContext, useEffect, useState } from "react";
import { loadingContext } from "../contexts/LoadingContext/LoadingContext";
import { departmentService } from "../services/departmentServices";

export default function useRoomList() {
  const [loadingState, setLoadingState] = useContext(loadingContext);
  const [roomList, setRoomList] = useState([]);
  const fetchRoomList = async () => {
    setLoadingState({ isLoading: true });
    const result = await departmentService.fetchDepartmentListApi();
    setRoomList(result.data.content);
    setLoadingState({ isLoading: false });
  };
  useEffect(() => {
    fetchRoomList();
  }, []);
  return roomList;
}
