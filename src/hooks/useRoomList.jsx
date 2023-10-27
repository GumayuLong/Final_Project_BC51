import React, { useContext, useEffect, useState } from "react";
import { roomService } from "../services/room";
import { loadingContext } from "../contexts/LoadingContext/LoadingContext";

export default function useRoomList() {
  const [loadingState, setLoadingState] = useContext(loadingContext);
  const [roomList, setRoomList] = useState([]);
  const fetchRoomList = async () => {
    setLoadingState({ isLoading: true });
    const result = await roomService.fetchRoomListApi();
    setRoomList(result.data.content);
    setLoadingState({ isLoading: false });
  };
  useEffect(() => {
    fetchRoomList();
  }, []);
  return roomList;
}
