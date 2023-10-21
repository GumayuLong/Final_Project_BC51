import React, { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { userService } from "../../services/user";
// import { setUserInfoAction } from "../../store/actions/userAction";
import { notification } from "antd";
// import { validation } from "../../validations/validation";
// import "../Login/login.scss";
import { faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userService } from "../../services/userService";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usernameInputRef = createRef();
  const fullNameInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();
  const emailInputRef = createRef();
  const phoneNumberInputRef = createRef();

   const [state, setState] = useState({
		id: 0,
		name: "",
		email: "",
		password: "",
		phone: "",
		birthday: "",
		gender: true,
   });
   const [confirmPassword, setConfirmPassword] = useState("");

   const handleChange = (event) => {
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
		const result = await userService.registerApi(state);
   }

  return (
		<div className="bgcustom">
			<main className="main">
				<div className="form" style={{ top: "45%" }}>
					<div className="w-75 mx-auto py-5">
						<div style={{ textAlign: "center" }}>
							<FontAwesomeIcon
								className="icon"
								icon={faRightToBracket}
							/>
						</div>
						<h1 className="title">Đăng ký</h1>
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<input
									placeholder="Họ tên*"
									onChange={handleChange}
									name="name"
									type="text"
									className="form-control"
								/>
								<p
									ref={usernameInputRef}
									className="text-danger"
								></p>
							</div>
							<div className="form-group">
								<input
									placeholder="Mật khẩu*"
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
								<input
									placeholder="Nhập lại mật khẩu*"
									onChange={handleChangeConfirmPassword}
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
								<input
									placeholder="Email*"
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
							<div className="form-group">
								<input
									placeholder="Số điện thoại*"
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
								<input
									placeholder="Ngày sinh*"
									onChange={handleChange}
									name="birthday"
									type="date"
									className="form-control"
								/>
								<p
									ref={phoneNumberInputRef}
									className="text-danger"
								></p>
							</div>
							{/* <div className="form-group">
								<input
									placeholder="Giới tính*"
									onChange={handleChange}
									name="gender"
									type="text"
									className="form-control"
								/>
								<p
									ref={phoneNumberInputRef}
									className="text-danger"
								></p>
							</div> */}
							<button className="btn btn-success btncustom">
								Đăng ký
							</button>
							<div>
								<a href="/login">
									<h3 className="connectlink">
										Quay lại đăng nhập?
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
