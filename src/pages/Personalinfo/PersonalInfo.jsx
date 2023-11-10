/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { userService } from "../../services/userService";
import { bookRoomService } from "../../services/bookRoomService";

export default function PersonalInfo() {
	const params = useParams();
	const [userInfo, setUserInfo] = useState([]);
	const [bookingInfo, setBookingInfo] = useState([]);
	const [avatar, setAvatar] = useState(
		"http://dergipark.org.tr/assets/app/images/buddy_sample.png"
	);
	const [file, setFile] = useState(null);

	useEffect(() => {
		fetchPersonalInfo();
		fetchBookedRoomFromUser();
	}, []);

	const fetchPersonalInfo = async () => {
		const result = await userService.userInfoApi(params.userId);
		setUserInfo(result.data.content);
		if (result.data.content.avatar !== "") {
			setAvatar(result.data.content.avatar);
		}
	};

	const fetchBookedRoomFromUser = async () => {
		const result = await bookRoomService.fetchBookedRoomFromUserApi(
			params.userId
		);
		setBookingInfo(result.data.content);
	};

	const handleOnchange = (event) => {
		setUserInfo({
			...userInfo,
			[event.target.name]: event.target.value,
		});
	};

	const updateUserInfo = async () => {
		await userService
			.updateUserInfoApi(userInfo.id, userInfo)
			.then((result) => {
				notification.success({
					message: "Cập nhật thông tin thành công",
					placement: "topRight",
				});
				document.getElementById("btnDong").click();
			})
			.catch((err) => {
				notification.danger({
					message: err.response.data.content,
					placement: "topRight",
				});
			});
	};

	const handleUploadAvatar = (e) => {
		setFile(e.target.files[0]);
	};

	const uploadAvatar = async () => {
		const data = new FormData();
		data.append("formFile", file);
		if (data && file !== "") {
			await userService
				.postAvatarApi(data)
				.then((result) => {
					notification.success({
						message: "Cập nhật avatar thành công",
						placement: "topRight",
					});
					setAvatar(result.data.content.avatar);
				})
				.catch((err) => {
					notification.warning({
						message: err.response.data.content,
						placement: "topRight",
					});
				});
		} else {
		}
	};

	const renderBookingInfo = () => {
		return bookingInfo.map((element) => {
			return (
				<tr key={element.id}>
					<td>{element.maPhong}</td>
					<td>{element.ngayDen}</td>
					<td>{element.ngayDi}</td>
					<td>{element.soLuongKhach}</td>
				</tr>
			);
		});
	};

	const renderUserInfo = () => {
		let id = new Date();
		return (
			<div className="col-5" key={id}>
				<div className="form">
					<div className="w-90 ml-5 py-5 col-9">
						<h1 className="title">Thông tin cá nhân</h1>
						<form>
							<div className="registerlayout">
								<div style={{ marginRight: "10px" }}>
									<div className="form-group">
										<div className="d-flex justify-content-between">
											<label
												className="labelRegister"
												htmlFor=""
											>
												Họ và tên
											</label>
										</div>
										<input
											value={userInfo.name}
											disabled={true}
											name="name"
											type="text"
											className="form-control"
											id={userInfo.name}
										/>
									</div>
									<div className="form-group">
										<div className="d-flex justify-content-between">
											<label
												className="labelRegister"
												htmlFor=""
											>
												Giới tính
											</label>
										</div>
										<select
											disabled={true}
											value={userInfo.gender}
											onChange={handleOnchange}
											className="form-control"
											name="gender"
										>
											<option value={true}>Nam</option>
											<option value={false}>Nữ</option>
										</select>
									</div>
									<div className="form-group">
										<div className="d-flex justify-content-between">
											<label
												className="labelRegister"
												htmlFor=""
											>
												Ngày sinh
											</label>
										</div>
										<input
											value={userInfo.birthday}
											disabled={true}
											id="inputBirthday"
											type="text"
											className="form-control"
											name="confirmPassword"
										/>
									</div>
									<div className="form-group">
										<div className="d-flex justify-content-between">
											<label
												className="labelRegister"
												htmlFor=""
											>
												Địa chỉ email
											</label>
										</div>
										<input
											value={userInfo.email}
											disabled={true}
											name="email"
											type="text"
											className="form-control"
											id="inputEmail"
										/>
									</div>
									<div className="form-group">
										<div className="d-flex justify-content-between">
											<label
												className="labelRegister"
												htmlFor=""
											>
												Số điện thoại
											</label>
										</div>
										<input
											value={userInfo.phone}
											disabled={true}
											name="phone"
											type="text"
											className="form-control"
											id="inputPhone"
										/>
									</div>
									<button
										type="button"
										className="btn btn-warning"
										data-toggle="modal"
										data-target="#myModal"
									>
										Chỉnh sửa thông tin
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="p-5" style={{ minHeight: "95vh" }}>
			<nav>
				<div className="nav nav-tabs" id="nav-tab" role="tablist">
					<button
						className="nav-link active"
						id="nav-home-tab"
						data-bs-toggle="tab"
						data-bs-target="#nav-home"
						type="button"
						role="tab"
						aria-controls="nav-home"
						aria-selected="true"
					>
						Personal infomation
					</button>
				</div>
			</nav>
			<div className="tab-content mt-3" id="nav-tabContent">
				{/* update info user */}
				<div
					className="tab-pane fade show active w-90 ml-5 py-5 "
					id="nav-home"
					role="tabpanel"
					aria-labelledby="nav-home-tab"
					tabIndex={0}
				>
					<div className="row">
						<div className="col-2">
							<img
								className="rounded-circle"
								src={avatar}
								width="200px"
								height="200px"
							/>
							<input
								onChange={handleUploadAvatar}
								className="my-3 form-control"
								type="file"
							/>
							<button
								type="button"
								className="btn btn-info"
								onClick={uploadAvatar}
							>
								Upload avatar
							</button>
						</div>
						{renderUserInfo()}
						<div className="modal" id="myModal">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h4 className="modal-title">
											Cập nhật thông tin cá nhân
										</h4>
										<button
											type="button"
											className="close"
											data-dismiss="modal"
										>
											×
										</button>
									</div>
									<div className="modal-body">
										{/* Modal body.. */}
										<form action="">
											<div className="form-group">
												<label
													className="labelRegister"
													htmlFor=""
												>
													Họ và tên
												</label>
												<input
													value={userInfo.name}
													onChange={handleOnchange}
													type="text"
													className="form-control"
													name="name"
												/>
											</div>
											<div className="form-group">
												<label
													className="labelRegister"
													htmlFor=""
												>
													Giới tính
												</label>
												<select
													value={userInfo.gender}
													onChange={handleOnchange}
													className="form-control"
													name="gender"
												>
													<option value={true}>
														Nam
													</option>
													<option value={false}>
														Nữ
													</option>
												</select>
											</div>
											<div className="form-group">
												<label
													className="labelRegister"
													htmlFor=""
												>
													Ngày sinh
												</label>
												<input
													value={userInfo.birthday}
													onChange={handleOnchange}
													type="date"
													className="form-control"
													name="birthday"
												/>
											</div>
											<div className="form-group">
												<label
													className="labelRegister"
													htmlFor=""
												>
													Địa chỉ email
												</label>
												<input
													value={userInfo.email}
													onChange={handleOnchange}
													type="text"
													className="form-control"
													name="email"
												/>
											</div>
											<div className="form-group">
												<label
													className="labelRegister"
													htmlFor=""
												>
													Số điện thoại
												</label>
												<input
													value={userInfo.phone}
													onChange={handleOnchange}
													type="text"
													className="form-control"
													name="phone"
												/>
											</div>
										</form>
									</div>
									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-warning"
											onClick={() => updateUserInfo()}
										>
											Cập nhật
										</button>
										<button
											type="button"
											className="btn btn-danger"
											data-dismiss="modal"
											id="btnDong"
										>
											Đóng
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-5 text-center">
							<div className="w-90 ml-5 py-5 col-9">
								<h1>Lịch sử đặt phòng</h1>
								<table className="table table-dark table-striped">
									<thead>
										<tr>
											<th style={{ borderTop: "none" }}>
												Mã phòng
											</th>
											<th>Ngày đến</th>
											<th>Ngày đi</th>
											<th>Số khách</th>
										</tr>
									</thead>
									<tbody>{renderBookingInfo()}</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
