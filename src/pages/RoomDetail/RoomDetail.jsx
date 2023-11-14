import React, { useEffect, useState } from "react";
import { departmentService } from "../../services/departmentServices";
import { useParams } from "react-router-dom";
import { bookRoomService } from "../../services/bookRoomService";
import { commentService } from "../../services/commentService";

export default function RoomDetail() {
	const params = useParams();
	const [detail, setDetail] = useState({});
	const [listDepartment, setListDepartment] = useState([]);
  const [listComments, setListComments] = useState([]);

  const userString = localStorage.getItem("USER_INFO");
  const user = JSON.parse(userString);

  // FORMAT CURRENT DAY
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Thêm 1 vào vì tháng bắt đầu từ 0
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const [comment, setComment] = useState({
		id: 0,
		maPhong: Number(params.id),
		maNguoiBinhLuan: user.user.id,
		ngayBinhLuan: formattedDate,
		noiDung: "",
		saoBinhLuan: "",
  });

	useEffect(() => {
		departmentDetail();
		listBookedDepartment();
		fetchCommentList();
	}, []);

  // LẤY THÔNG TIN CHI TIẾT CỦA PHÒNG THEO ID PHÒNG
	const departmentDetail = async () => {
		await departmentService
			.fetchDepartmentDetailApi(params.id)
			.then((result) => {
				// console.log(result.data.content);
				setDetail(result.data.content);
			})
			.catch((err) => console.log(err));
	};

  // LẤY TẤT CẢ THÔNG TIN BOOK CỦA TẤT CẢ CÁC PHÒNG
	const listBookedDepartment = async () => {
		await bookRoomService
			.fetchListBookedRoomApi()
			.then((result) => {
				// console.log(result.data.content);
				setListDepartment(result.data.content);
			})
			.catch((err) => console.log(err));
	};

  // LẤY TẤT CẢ CÁC BÌNH LUẬN THEO ID PHÒNG
	const fetchCommentList = async () => {
		await commentService
			.fetchCommentListApi(params.id)
			.then((result) => {
				// console.log(result.data.content);
        setListComments(result.data.content);
			})
			.catch((err) => console.log(err));
	};

  // HÀM KIỂM TRA THỜI GIAN BOOK CỦA PHÒNG ĐÓ
  const checkBookedDepartment = () => {
		const data = [...listDepartment];
		const check = data.filter((element) => element.maPhong === detail.id);
		// console.log(check);
    // SỬ DỤNG DANH SÁCH ĐÃ FILTER (check) ĐỂ HIỂN THỊ THỜI GIAN ĐÃ ĐƯỢC ĐẶT
  };

  // HANDLE ONCHANGE INPUT COMMENT
  const handleComment = (event) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await commentService.createCommentApi(comment).then((result) => {
      console.log(result.data.content);
      setComment(result.data.content);
    }).catch((err) => console.log(err))
  }

	return (
		<>
			{/* <div>RoomDetail</div> */}
			{checkBookedDepartment()}
			<form className="container" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="">Comment</label>
					<input
						name="noiDung"
						type="text"
						className="form-control my-2"
						onChange={handleComment}
					/>
				</div>
				<div>
					<label htmlFor="">Rate</label>
					<input
						name="saoBinhLuan"
						type="number"
						min={1}
						max={5}
						className="form-control my-2"
						onChange={handleComment}
					/>
				</div>
				<button className="btn btn-success my-2 mx-5">
					Add comment
				</button>
			</form>
		</>
	);
}
