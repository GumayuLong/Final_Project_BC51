import React, { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfoAction } from "../../store/actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Form, Input } from "antd";
import { userService } from "../../services/userService";


export default function Login() {
  const accountInputRef = createRef();
  const passwordInputRef = createRef();
  const navigate = useNavigate();

   const [state, setState] = useState({
		email: "",
		password: "",
   });

   const handleChange = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
   };

   const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await userService.loginApi(state);
    console.log(result.data.content);
   }

  return (
		<div>
			<div>
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
								<Form.Item>
									<Input
										placeholder="Email*"
										onChange={handleChange}
										name="email"
										type="text"
										size="large"
									/>
								</Form.Item>
								<p
									ref={accountInputRef}
									className="text-danger"
									style={{ marginTop: "-20px" }}
								></p>
								<Form.Item>
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
								></p>
								<button className="btn btn-primary">
									Đăng nhập
								</button>
								<div>
									<a href="/register">
										<h3>
											Bạn chưa có tài khoản? Đăng ký
										</h3>
									</a>
								</div>
							</form>
						</div>
					</div>
				</main>
			</div>
		</div>
  );
}
