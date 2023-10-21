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
		name: "",
		email: "",
		password: "",
		phone: "",
		birthday: "",
		gender: true,
		role: "",
   });

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
						<form>
							<div className="form-group">
								<input
									placeholder="Tên tài khoản*"
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
									placeholder="Họ và tên*"
									name="hoTen"
									type="text"
									className="form-control"
								/>
								<p
									ref={fullNameInputRef}
									className="text-danger"
								></p>
							</div>
							<div className="form-group">
								<input
									placeholder="Email*"
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
									name="phone"
									type="text"
									className="form-control"
								/>
								<p
									ref={phoneNumberInputRef}
									className="text-danger"
								>
								</p>
							</div>
							<div className="form-group">
								<input
									placeholder="Ngày sinh*"
									name="birthday"
									type="date"
									className="form-control"
								/>
								<p
									ref={phoneNumberInputRef}
									className="text-danger"
								>
								</p>
							</div>
							<div className="form-group">
								<input
									placeholder="Giới tính*"
									name="gender"
									type="text"
									className="form-control"
								/>
								<p
									ref={phoneNumberInputRef}
									className="text-danger"
								>
								</p>
							</div>
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
