import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function AuthGuard(props) {
	const navigate = useNavigate();
	const userState = useSelector((state) => state.userReducer);
	useEffect(() => {
		// Chưa đăng nhập
		if (!userState.userInfo) {
			navigate("/login");
		}
        console.log(userState)
	}, []);

	return <>{props.children}</>;
}
