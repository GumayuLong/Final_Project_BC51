import React, { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userService } from "../../services/userService";
import { setUserInfoAction } from "../../store/actions/userAction";
import { validation } from "../../validations/validation";
import "../Login/login.scss";

export default function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const fullNameInputRef = createRef();
	const passwordInputRef = createRef();
	const confirmPasswordInputRef = createRef();
	const emailInputRef = createRef();
	const phoneNumberInputRef = createRef();
	const birthdayInputRef = createRef();
	const genderInputRef = createRef();

	const [state, setState] = useState({
		id: 0,
		name: "",
		email: "",
		password: "",
		phone: "",
		birthday: "",
		gender: "",
		role: "USER"
	});
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errMessage, setErrMessage] = useState("");

	const handleChange = (event) => {
		console.log(`${event.target.name}: ${event.target.value}`);
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeConfirmPassword = (event) => {
		setConfirmPassword({
			...confirmPassword,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		let isValid = true;

		// CHECK VALIDATION NAME
		isValid &=
			validation.validateRequired(
				state.name,
				fullNameInputRef.current,
				"Vui lòng nhập tên!"
			) &&
			validation.validateFullName(
				state.name,
				fullNameInputRef.current,
				"Vui lòng nhập tên là ký tự chữ!"
			);

		// CHECK VALIDATION PASSWORD
		isValid &= validation.validateRequired(
			state.password,
			passwordInputRef.current,
			"Vui lòng nhập mật khẩu!"
		);

		// CHECK VALIDATION CONFIRM PASSWORD
		isValid &=
			validation.validateRequired(
				confirmPassword,
				confirmPasswordInputRef.current,
				"Vui lòng xác nhận lại mật khẩu!"
			) &&
			validation.validateConfirmPassword(
				state.password,
				confirmPassword.confirmPassword,
				confirmPasswordInputRef.current,
				"Vui lòng nhập lại đúng mật khẩu ở trên!"
			);

		// CHECK VALIDATION EMAIL
		isValid &=
			validation.validateRequired(
				state.email,
				emailInputRef.current,
				"Vui lòng nhập email!"
			) &&
			validation.validateWithRegex(
				state.email,
				emailInputRef.current,
				"Vui lòng nhập đúng định dạng email!",
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
			);

		// CHECK VALIDATION PHONE NUMBER
		isValid &=
			validation.validateRequired(
				state.phone,
				phoneNumberInputRef.current,
				"Vui lòng nhập số điện thoại!"
			) &&
			validation.validateWithRegex(
				state.phone,
				phoneNumberInputRef.current,
				"Vui lòng nhập số điện thoại là ký tự chữ số!",
				/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
			);

		// CHECK VALIDATION BIRTHDAY
		isValid &= validation.validateRequired(
			state.birthday,
			birthdayInputRef.current,
			"Vui lòng nhập ngày sinh!"
		) && validation.validateWithRegex(
			state.birthday,
			birthdayInputRef.current,
			"Vui lòng nhập ngày sinh!",
			/^\d{4}-\d{2}-\d{2}$/
		)

		// CHECK VALIDATION GENDER
		isValid &= validation.validateType(
			state.gender,
			genderInputRef.current,
			"Vui lòng chọn giới tính"
		);

		if (isValid) {
			await userService
				.registerApi(state)
				.then((result) => {
					dispatch(setUserInfoAction(result.data.content));
					notification.success({
						message: "Đăng ký thành công",
						placement: "topLeft",
					});
					navigate("/login");
				})
				.catch((error) => {
					setErrMessage(error.response.data.content);
					// console.log(error.response.data.content);
					genderInputRef.current.innerHTML = errMessage;
				});
		}
	};

	return (
		<div className="bgcustom">
			<main className="mainRegister">
				<div className="form" style={{ top: "45%" }}>
					<div className="w-90 mx-auto py-5">
						<div style={{ textAlign: "center" }}>
							<FontAwesomeIcon
								className="icon"
								icon={faRightToBracket}
							/>
						</div>
						<h1 className="title">Đăng ký</h1>
						<form onSubmit={handleSubmit}>
							<div className="registerlayout">
								<div style={{ marginRight: "10px" }}>
									<div className="form-group">
										<label
											className="labelRegister"
											htmlFor=""
										>
											Tên người dùng*
										</label>
										<input
											placeholder="Điền vào đây ..."
											onChange={handleChange}
											name="name"
											type="text"
											className="form-control"
										/>
										<p
											ref={fullNameInputRef}
											className="text-danger"
										></p>
									</div>
									<div className="form-group">
										<label
											className="labelRegister"
											htmlFor=""
										>
											Mật khẩu*
										</label>
										<input
											placeholder="********"
											onChange={handleChange}
											name="password"
											type="password"
											className="form-control"
										/>
										<p
											ref={passwordInputRef}
											className="text-danger"
										></p>
									</div>
									<div className="form-group">
										<label
											className="labelRegister"
											htmlFor=""
										>
											Xác nhận mật khẩu*
										</label>
										<input
											placeholder="********"
											onChange={
												handleChangeConfirmPassword
											}
											id="confirmPassword"
											type="password"
											className="form-control"
											name="confirmPassword"
										/>
										<p
											ref={confirmPasswordInputRef}
											className="text-danger"
										></p>
									</div>
									<div className="form-group">
										<label
											className="labelRegister"
											htmlFor=""
										>
											Email*
										</label>
										<input
											placeholder="Example@gmail.com"
											onChange={handleChange}
											name="email"
											type="text"
											className="form-control"
										/>
										<p
											ref={emailInputRef}
											className="text-danger"
										></p>
									</div>
								</div>
								<div style={{ marginLeft: "10px" }}>
									<div className="form-group">
										<label
											className="labelRegister"
											htmlFor=""
										>
											Số điện thoại*
										</label>
										<input
											placeholder="090 1821 109"
											onChange={handleChange}
											name="phone"
											type="text"
											className="form-control"
										/>
										<p
											ref={phoneNumberInputRef}
											className="text-danger"
										></p>
									</div>
									<div className="form-group">
										<label
											className="labelRegister"
											htmlFor=""
										>
											Ngày sinh*
										</label>
										<input
											onChange={handleChange}
											name="birthday"
											type="date"
											className="form-control"
										/>
										<p
											ref={birthdayInputRef}
											className="text-danger"
										></p>
									</div>
									<div className="form-group">
										<div className="input-group">
											<div className="form-group">
												<label
													className="labelRegister"
													htmlFor=""
												>
													Giới tính*
												</label>
												<select
													className="form-control"
													name="gender"
													id="cars"
													onChange={handleChange}
												>
													<option value="true">
														Nam
													</option>
													<option value="false">
														Nữ
													</option>
												</select>
											</div>
										</div>
										<p
											ref={genderInputRef}
											className="text-danger"
										>
											{errMessage}
										</p>
									</div>
								</div>
							</div>
							<button className="btn btn-success btncustom">
								Đăng ký
							</button>
							<div>
								<a href="/login">
									<h3
										className="connectlink"
										style={{ textAlign: "center" }}
									>
										Đăng nhập ngay
									</h3>
								</a>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}
