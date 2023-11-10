/** @format */

import React, { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfoAction } from "../../store/actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./login.scss";

import { Form, Input } from "antd";
import { userService } from "../../services/userService";
import { validation } from "../../validations/validation";

export default function Login() {
	const emailInputRef = createRef();
	const passwordInputRef = createRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [state, setState] = useState({
		email: "",
		password: "",
	});
	const [errMessage, setErrMessage] = useState("");

	const handleChange = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		let isValid = true;

		// CHECK VALIDATION ACCOUNT LOGIN
		isValid &= validation.validateRequired(
			state.email,
			emailInputRef.current,
			"Vui lòng nhập email!"
		);

		// CHECK VALIDATION PASSWORD ACCOUNT LOGIN
		isValid &= validation.validateRequired(
			state.password,
			passwordInputRef.current,
			"Vui lòng nhập mật khẩu!"
		);

		if (isValid) {
			await userService
				.loginApi(state)
				.then((result) => {
					localStorage.setItem(
						"USER_INFO",
						JSON.stringify(result.data.content)
					);
					dispatch(setUserInfoAction(result.data.content));
					setErrMessage("");
					navigate("/");
				})
				.catch((error) => {
					// setPosts(error.data);
					setErrMessage(error.response.data.content);
					passwordInputRef.current.innerHTML = errMessage;
				});
		}
	};

	return (
		<div>
			<div className="bgcustom">
				<main className="main">
					<div className="form">
						<div className="w-75 mx-auto py-5">
							<div style={{ textAlign: "center" }}>
								<FontAwesomeIcon
									className="icon"
									icon={faUser}
								/>
							</div>
							<h1 className="title">Đăng nhập</h1>
							<form onSubmit={handleSubmit}>
								<Form.Item style={{ marginBottom: "35px" }}>
									<Input
										placeholder="Email*"
										onChange={handleChange}
										name="email"
										type="text"
										size="large"
									/>
								</Form.Item>
								<p
									ref={emailInputRef}
									className="text-danger"
									style={{ marginTop: "-20px" }}
								></p>
								<Form.Item style={{ marginBottom: "35px" }}>
									<Input.Password
										placeholder="Mật khẩu*"
										onChange={handleChange}
										name="password"
										size="large"
									/>
								</Form.Item>
								<p
									ref={passwordInputRef}
									className="text-danger"
									style={{ marginTop: "-20px" }}
								>
									{errMessage}
								</p>
								<button className="btn btn-primary btncustom">
									Đăng nhập
								</button>
								<div>
									<h3 className="connectlink">
										Bạn chưa có tài khoản?{" "}
										<a href="/register">Đăng ký ngay</a>
									</h3>
								</div>
							</form>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
