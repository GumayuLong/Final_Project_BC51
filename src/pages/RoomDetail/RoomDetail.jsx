import React, { useEffect, useState } from "react";
import { departmentService } from "../../services/departmentServices";
import { useParams } from "react-router-dom";
import { bookRoomService } from "../../services/bookRoomService";
import { commentService } from "../../services/commentService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faCalendarAlt,
  faCar,
  faChevronRight,
  faHeart,
  faKitchenSet,
  faLanguage,
  faLocationDot,
  faMedal,
  faShare,
  faSoap,
  faStar,
  faSwimmingPool,
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faTv,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { UserOutlined } from "@ant-design/icons";
import { positionService } from "../../services/positionService";
import { DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";

export default function RoomDetail() {
  const params = useParams();
  const [detail, setDetail] = useState({});
  const [locate, setLocate] = useState({});
  const [listDepartment, setListDepartment] = useState([]);
  const [listComments, setListComments] = useState([]);

  const userString = localStorage.getItem("USER_INFO");
  const user = JSON.parse(userString);

  // FORMAT CURRENT DAY
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  // Thêm 1 vào vì tháng bắt đầu từ 0
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
    locateDetail();
  }, []);

  // LẤY THÔNG TIN CHI TIẾT CỦA PHÒNG THEO ID PHÒNG
  const departmentDetail = async () => {
    await departmentService
      .fetchDepartmentDetailApi(params.id)
      .then((result) => {
        setDetail(result.data.content);
      })
      .catch((err) => console.log(err));
  };

  // LẤY THÔNG TIN CHI TIẾT CỦA PHÒNG THEO ID VỊ TRÍ
  const locateDetail = async () => {
    await positionService
      .fetchPositionDetailApi(detail.maViTri)
      .then((result) => {
        setLocate(result.data.content);
      })
      .catch((err) => console.log(err));
  };

  // LẤY TẤT CẢ THÔNG TIN BOOK CỦA TẤT CẢ CÁC PHÒNG
  const listBookedDepartment = async () => {
    await bookRoomService
      .fetchListBookedRoomApi()
      .then((result) => {
        setListDepartment(result.data.content);
      })
      .catch((err) => console.log(err));
  };

  // LẤY TẤT CẢ CÁC BÌNH LUẬN THEO ID PHÒNG
  const fetchCommentList = async () => {
    await commentService
      .fetchCommentListApi(params.id)
      .then((result) => {
        setListComments(result.data.content);
      })
      .catch((err) => console.log(err));
  };

  // HÀM KIỂM TRA THỜI GIAN BOOK CỦA PHÒNG ĐÓ
  const checkBookedDepartment = () => {
    const data = [...listDepartment];
    data.filter((element) => element.maPhong === detail.id);
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
    await commentService
      .createCommentApi(comment)
      .then((result) => {
        console.log(result.data.content);
        setComment(result.data.content);
      })
      .catch((err) => console.log(err));
  };

  //Format chọn ngày
  const handleChangeDatePicker = (value) => {
    const date = dayjs(value).format("DD/MM/YYYY");
  };

  return (
    <React.Fragment>
      <section className="container my-4">
        <div className="room-detail">
          <h3>{detail.tenPhong}</h3>
          <div className="d-flex justify-content-between align-items-center my-3">
            <div>
              <span className="text-sm">
                <FontAwesomeIcon icon={faStar} /> 4 -
              </span>
              <span className="text-sm mx-1">64 đánh giá -</span>
              <span className="text-sm mx-1">
                <FontAwesomeIcon icon={faAward} className="pr-2" />
                Chủ nhà siêu cấp -
              </span>
              <span className="underline text-sm mx-1">{locate.tenViTri}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn-custom-3 px-2 py-1 d-flex justify-content-between align-items-center">
                <FontAwesomeIcon icon={faShare} />
                <span className="ml-2">Chia sẻ</span>
              </button>
              <button className="btn-custom-3 px-2 py-1 ml-2 d-flex justify-content-between align-items-center">
                <FontAwesomeIcon icon={faHeart} />
                <span className="ml-2">Lưu</span>
              </button>
            </div>
          </div>

          <img className="img-fluid" src={detail.hinhAnh} alt="" />
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-8">
            <div className="d-flex justify-content-between align-items-center my-3 border-b">
              <div>
                <h3 className="font-semibold text-lg sm:text-2xl text-gray-800">
                  Toàn bộ căn hộ
                </h3>
                <span className="text-sm font-normal  tracking-widest text-gray-700">
                  <span>
                    {detail.khach} khách - {detail.phongNgu} phòng ngủ -{" "}
                    {detail.phongTam} phòng tắm
                  </span>
                </span>
              </div>
            </div>
            <hr />
            <div className="my-3 border-b">
              <div className="d-flex align-items-start">
                <div className="pt-2">
                  <FontAwesomeIcon
                    icon={faMedal}
                    style={{ width: 25, height: 25 }}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800 sm:text-lg ">
                    Sungwon là Chủ nhà siêu cấp
                  </h3>
                  <p className="tracking-wider text-gray-500">
                    Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh
                    giá cao và là những người cam kết mang lại quãng thời gian ở
                    tuyệt vời cho khách.
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-start mt-5">
                <div className="pt-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ width: 25, height: 25 }}
                    />
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800 sm:text-lg ">
                    Địa điểm tuyệt vời
                  </h3>
                  <p className="tracking-wider text-gray-500">
                    90% khách gần đây đã xếp hạng 5 sao cho vị trí này.
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-start mt-5">
                <div className="pt-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{ width: 25, height: 25 }}
                    />
                  </span>
                </div>
                <h3 className="ml-4 font-semibold text-gray-800  sm:text-lg">
                  Miễn phí hủy trong 48 giờ.
                </h3>
              </div>
            </div>
            <div className="mt-5 border-b">
              <img
                src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
                width={120}
                className="h-7 mb-4"
              />
              <div>
                <p className="text-justify tracking-wider text-gray-800 mb-2">
                  Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ
                  nhà hủy, thông tin nhà/phòng cho thuê không chính xác và những
                  vấn đề khác như sự cố trong quá trình nhận phòng.
                </p>
                <a href="#" className="small-link">
                  Tìm hiểu thêm
                  <span className="ml-1">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      style={{ width: 15, height: 15 }}
                    />
                  </span>
                </a>
              </div>
            </div>
            <hr />
            <div className="my-3 border-b">
              <div className="d-flex align-items-center justify-content-between">
                <div className="mr-2 d-flex align-items-center justify-content-between">
                  <FontAwesomeIcon
                    icon={faLanguage}
                    style={{ width: 25, height: 25 }}
                  />
                  <span className="text-base tracking-wider text-gray-800 ml-2">
                    Một số thông tin đã được dịch tự động.
                  </span>
                </div>
                <a href="#" className="small-link">
                  Hiển thị ngôn ngữ gốc
                  <span className="ml-1">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      style={{ width: 15, height: 15 }}
                    />
                  </span>
                </a>
              </div>
            </div>
            <hr />
            <div className="my-3 border-b">
              <p className="text-justify tracking-wider text-gray-800 mb-4">
                Nhà nghỉ thôn dã hình lưỡi liềm trong một ngôi làng nghệ thuật
                gốm hai nghìn năm. Một ngôi nhà nguyên khối lớn với sân thượng
                ba tầng của Bảo tàng Văn hóa Guitar Serra, nổi tiếng với mặt
                tiền đặc sắc trong một ngôi làng nghệ thuật gốm hai nghìn năm
                pha trộn rất tốt với thiên nhiên.
              </p>
              <p className="text-justify tracking-wider text-gray-800 mb-4">
                Tận hưởng kỳ nghỉ dưỡng sức cảm xúc thư giãn trong một căn phòng
                ấm cúng, chào...
              </p>
              <a href="#" className="small-link">
                Hiển thị thêm
                <span className="ml-1">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ width: 15, height: 15 }}
                  />
                </span>
              </a>
            </div>
            <hr />
            <div className="mt-3 pb-5">
              <div>
                <h4 className="font-semibold text-gray-800 text-xl pb-4">
                  Nơi này có những gì cho bạn
                </h4>
              </div>

              <div className="row">
                {detail.mayGiat ? (
                  <div className="col-4 my-3 d-flex align-item-center">
                    <FontAwesomeIcon
                      icon={faSoap}
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="ml-2">Máy giặt</span>
                  </div>
                ) : (
                  <></>
                )}
                {detail.banLa ? (
                  <div className="col-4 my-3 d-flex align-item-center">
                    <FontAwesomeIcon
                      icon={faTemperatureArrowUp}
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="ml-2">Bàn là</span>
                  </div>
                ) : (
                  <></>
                )}
                {detail.tivi ? (
                  <div className="col-4 my-3 d-flex align-item-center">
                    <FontAwesomeIcon
                      icon={faTv}
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="ml-2">Tivi</span>
                  </div>
                ) : (
                  <></>
                )}
                {detail.dieuHoa ? (
                  <div className="col-4 my-3 d-flex align-item-center">
                    <FontAwesomeIcon
                      icon={faTemperatureArrowDown}
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="ml-2">Điều hòa</span>
                  </div>
                ) : (
                  <></>
                )}
                {detail.wifi ? (
                  <div className="col-4 my-3 d-flex align-item-center">
                    <FontAwesomeIcon
                      icon={faWifi}
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="ml-2">Wifi</span>
                  </div>
                ) : (
                  <></>
                )}
                {detail.bep ? (
                  <div className="col-4 my-3 d-flex align-item-center">
                    <FontAwesomeIcon
                      icon={faKitchenSet}
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="ml-2">Bếp</span>
                  </div>
                ) : (
                  <></>
                )}
                {detail.doXe ? (
                  <div className="col-4 my-3 d-flex align-item-center">
                    <FontAwesomeIcon
                      icon={faCar}
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="ml-2">Đỗ xe</span>
                  </div>
                ) : (
                  <></>
                )}
                {detail.hoBoi ? (
                  <div className="col-4 my-3 d-flex align-item-center">
                    <FontAwesomeIcon
                      icon={faSwimmingPool}
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="ml-2">Hồ bơi</span>
                  </div>
                ) : (
                  <></>
                )}
                {detail.bep ? (
                  <div className="col-4 my-3 d-flex align-item-center">
                    <FontAwesomeIcon
                      icon={faTemperatureArrowUp}
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="ml-2">Bàn ủi</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="mt-2">
                <a href="#" className="small-link">
                  Hiển thị tất cả tiện nghi
                  <span className="ml-1">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      style={{ width: 15, height: 15 }}
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div style={{ position: "sticky", top: "1rem" }}>
              <div
                className="bg-white shadow-xl border rounded-xl p-6 w-full lg:w-5/6 mx-auto"
                style={{
                  borderRadius: 20,
                  boxShadow:
                    "0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1)",
                }}
              >
                <div className="relative w-full" style={{ width: "100%" }}>
                  <div className="d-flex justify-content-between align-items-center m-3">
                    <div>
                      <span>$ </span>
                      <span style={{ fontWeight: "500", fontSize: 18 }}>
                        {detail.giaTien}
                      </span>
                      <span className="text-base"> / đêm</span>
                    </div>
                    <div>
                      <span className="text-sm font-normal">
                        <FontAwesomeIcon icon={faStar} /> 4 -
                      </span>
                      <span className="underline text-sm font-normal tracking-widest">
                        80 đánh giá
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-2 mx-3">
                    <div className="border-r border-solid border-gray-400 rounded-tl-md w-full cursor-pointer hover:bg-gray-100">
                      <div className="sub-title">Nhận phòng</div>
                      <DatePicker
                        className="mt-2"
                        onChange={handleChangeDatePicker}
                        size="large"
                        format={"DD/MM/YYYY"}
                        name="ngayDen"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className=" rounded-tr-md w-full cursor-pointer hover:bg-gray-100">
                      <div className="sub-title">Trả phòng</div>
                      <DatePicker
                        className="mt-2"
                        onChange={handleChangeDatePicker}
                        size="large"
                        format={"DD/MM/YYYY"}
                        name="ngayDi"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="mx-3">
                    <div className="sub-title">Khách</div>
                    <InputNumber
                      className="mt-2"
                      addonBefore={<UserOutlined />}
                      placeholder="Số khách"
                      min={1}
                      max={10}
                      size="large"
                    />
                  </div>
                  <div className="px-3 pt-3 pb-2" style={{ width: "100%" }}>
                    <button
                      type="submit"
                      className="btn-custom-2"
                      style={{ width: "100%" }}
                    >
                      Đặt phòng
                    </button>
                  </div>
                </div>

                <div className="text-center font-normal text-gray-400">
                  <span>Bạn vẫn chưa bị trừ tiền</span>
                </div>
                <div className="border-b pt-2 mx-3">
                  <div className="d-flex justify-content-between py-1">
                    <div className="underline text-gray-600 sub-title">
                      $ {detail.giaTien} x 0 đêm
                    </div>
                    <div>
                      <span>0</span> $
                    </div>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <div className="underline text-gray-600 sub-title">
                      Phí dịch vụ
                    </div>
                    <div>
                      <span>0</span> $
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between items-center text-lg font-semibold mb-3 mx-3">
                  <div className="sub-title">Tổng trước thuế</div>
                  <div>0 $</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
        <button className="btn btn-success my-2 mx-5">Add comment</button>
      </form>
    </React.Fragment>
  );
}
