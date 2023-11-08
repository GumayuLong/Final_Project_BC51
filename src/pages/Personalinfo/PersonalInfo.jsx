/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../../services/userService";
import { bookRoomService } from "../../services/bookRoomService";

export default function PersonalInfo() {
	const params = useParams();
	const [userInfo, setUserInfo] = useState([]);
	const [bookingInfo, setBookingInfo] = useState([]);
	const [infoRoom, setInfoRoom] = useState([]);

	useEffect(() => {
		fetchPersonalInfo();
		fetchBookedRoomFromUser();
		// roomInfomation();
	}, []);

	const fetchPersonalInfo = async () => {
		await userService
			.userInfoApi(params.userId)
			.then((result) => {
				setUserInfo(result.data.content);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// Get info phong`
	// const roomInfomation = async () => {
	// 	await bookRoomService
	// 		.bookInfoApi()
	// 		.then((result) => {
	// 			console.log(result.data.content);
	// 			let info = result.data.content.map((element) => element.id)
	// 			let data = [...info]
	// 			console.log(data)
	// 			setInfoRoom(result.data.content);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	// Lấy danh sách phòng đã đặt theo userId
	// -> tìm đc id dat phòng (id)
	const fetchBookedRoomFromUser = async () => {
		await bookRoomService
			.fetchBookedRoomFromUserApi(params.userId)
			.then((result) => {
				setBookingInfo(result.data.content);
				console.log(result.data.content)
				result.data.content.map(async (element) => {
					await bookRoomService
						.bookInfoApi(element.maPhong)
						.then((result) => {
							setInfoRoom((prev) => [
								...prev,
								result.data.content,
							]);
						})
						.catch((err) => console.log(err));
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const roomInfomation = async () => {
	// 	const data = [...bookingInfo];
	// 	data.map(async (element) => {
	// 		console.log(element.maPhong)
	// 		await bookRoomService
	// 			.bookInfoApi(element.maPhong)
	// 			.then((result) => {
	// 				setInfoRoom((prev) => [...prev, result.data.content]);
	// 			})
	// 			.catch((err) => console.log(err));
	// 	});
	// };

	// Tìm đc id phòng (maPhong) -> sử dụng API dat-phong/:maPhong
	// Để get thông tin của phòng và render ra giao diện
	const roomBookedFromUser = () => {
		const data = infoRoom.map((element) => element);
		console.log(data);
		return data.map((element) => {
			return (
				<p>
					{element.tenPhong}, {element.khach}, {element.phongNgu},{" "}
					{element.phongTam}, {element.hinhAnh}, {element.giaTien}
				</p>
			);
		});
	};

	const renderUserInfo = () => {
		return (
			<p>
				{userInfo.id} <br />
				{userInfo.name} <br />
				{userInfo.email} <br />
				{userInfo.birthday} <br />
				{userInfo.role} <br />
				{userInfo.avatar} <br />
				{userInfo.phone} <br />
			</p>
		);
	};

	return (
		<div>
			{renderUserInfo()} <br /> <br />
			{roomBookedFromUser()}
		</div>
	);
}
