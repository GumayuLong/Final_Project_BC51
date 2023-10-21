import React, { createRef, useState } from "react";
// import { userService } from "../../services/user";
import { useDispatch } from "react-redux";
// import { setUserInfoAction } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Form, Input } from "antd";


export default function Login() {
  const accountInputRef = createRef();
  const passwordInputRef = createRef();

   const [state, setState] = useState({
		email: "",
		password: "",
   });

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
							<form>
								<Form.Item>
									<Input
										placeholder="Tài khoản*"
										name="taiKhoan"
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
										name="matKhau"
										size="large"
									/>
								</Form.Item>
								<p
									ref={passwordInputRef}
									className="text-danger"
									style={{ marginTop: "-20px" }}
								>
								</p>
								<button className="btn btn-primary btncustom">
									Đăng nhập
								</button>
								<div>
									<a href="/register">
										<h3 className="connectlink">
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
