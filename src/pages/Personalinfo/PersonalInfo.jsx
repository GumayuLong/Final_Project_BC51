import React, { createRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { notification } from "antd";
import { userService } from "../../services/userService";
import { bookRoomService } from "../../services/bookRoomService";
import { validation } from "../../validations/validation";
import { useDispatch } from "react-redux";
import "./style.scss";

export default function PersonalInfo() {
  const params = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [bookingInfo, setBookingInfo] = useState([]);
  const [avatar, setAvatar] = useState(
    "http://dergipark.org.tr/assets/app/images/buddy_sample.png"
  );
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const fullNameInputRef = createRef();
  const phoneNumberInputRef = createRef();
  const birthdayInputRef = createRef();

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

  const handleChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    let isValid = true;

    // CHECK VALIDATION NAME
    isValid &=
      validation.validateRequired(
        userInfo.name,
        fullNameInputRef.current,
        "Vui lòng nhập tên!"
      ) &&
      validation.validateFullName(
        userInfo.name,
        fullNameInputRef.current,
        "Vui lòng nhập tên là ký tự chữ!"
      );

    // CHECK VALIDATION PHONE NUMBER
    isValid &=
      validation.validateRequired(
        userInfo.phone,
        phoneNumberInputRef.current,
        "Vui lòng nhập số điện thoại!"
      ) &&
      validation.validateWithRegex(
        userInfo.phone,
        phoneNumberInputRef.current,
        "Vui lòng nhập số điện thoại là ký tự chữ số!",
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
      );

    // CHECK VALIDATION BIRTHDAY
    isValid &=
      validation.validateRequired(
        userInfo.birthday,
        birthdayInputRef.current,
        "Vui lòng nhập ngày sinh!"
      ) &&
      validation.validateWithRegex(
        userInfo.birthday,
        birthdayInputRef.current,
        "Vui lòng nhập ngày sinh!",
        /^\d{4}-\d{2}-\d{2}$/
      );

    if (isValid) {
      await userService
        .updateUserInfoApi(userInfo.id, userInfo)
        .then((result) => {
          // console.log(result.data.content);
          // localStorage.setItem(
          // 	"USER_INFO",
          // 	JSON.stringify(result.data.content)
          // );
          // dispatch(setUserInfoAction(newLocal));

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
    }
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
      <form key={id}>
        <div className="registerlayout">
          <div style={{ marginRight: "10px" }}>
            <div className="form-group">
              <div className="d-flex justify-content-between">
                <label className="labelRegister" htmlFor="">
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
                <label className="labelRegister" htmlFor="">
                  Giới tính
                </label>
              </div>
              <select
                disabled={true}
                value={userInfo.gender}
                className="form-control"
                name="gender"
              >
                <option value={false}>Nam</option>
                <option value={true}>Nữ</option>
              </select>
            </div>
            <div className="form-group">
              <div className="d-flex justify-content-between">
                <label className="labelRegister" htmlFor="">
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
                <label className="labelRegister" htmlFor="">
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
                <label className="labelRegister" htmlFor="">
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
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Personal Information</h4>
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          data-target="#myModal"
        >
          Chỉnh sửa thông tin
        </button>
      </div>
      <div className="tab-content mt-3" id="nav-tabContent">
        <div
          className="tab-pane fade show active w-90 py-3 "
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          tabIndex={0}
        >
          <div className="row">
            <div className="col-6 col-sm-6 col-md-4 col-xl-3">
              <div className="p-0 m-0 d-flex flex-column align-items-center">
                <img
                  className="img-thumbnail img-fluid"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                    width: 150,
                    height: 150,
                  }}
                  src={avatar}
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
                  style={{ width: "100%" }}
                >
                  Upload Avatar
                </button>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-8 col-xl-9">
              {renderUserInfo()}
            </div>
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Cập nhật thông tin cá nhân</h4>
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
                    <form>
                      <div className="form-group">
                        <label className="labelRegister" htmlFor="">
                          Họ và tên
                        </label>
                        <input
                          value={userInfo.name}
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          name="name"
                        />
                        <p ref={fullNameInputRef} className="text-danger"></p>
                      </div>
                      <div className="form-group">
                        <label className="labelRegister" htmlFor="">
                          Giới tính
                        </label>
                        <select
                          value={userInfo.gender}
                          onChange={handleChange}
                          className="form-control"
                          name="gender"
                        >
                          <option value="true">Nam</option>
                          <option value="false">Nữ</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="labelRegister" htmlFor="">
                          Ngày sinh
                        </label>
                        <input
                          value={userInfo.birthday}
                          onChange={handleChange}
                          type="date"
                          className="form-control"
                          name="birthday"
                        />
                        <p ref={birthdayInputRef} className="text-danger"></p>
                      </div>
                      <div className="form-group">
                        <label className="labelRegister" htmlFor="">
                          Địa chỉ email
                        </label>
                        <input
                          value={userInfo.email}
                          disabled={true}
                          type="text"
                          className="form-control"
                          name="email"
                        />
                      </div>
                      <div className="form-group">
                        <label className="labelRegister" htmlFor="">
                          Số điện thoại
                        </label>
                        <input
                          value={userInfo.phone}
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          name="phone"
                        />
                        <p
                          ref={phoneNumberInputRef}
                          className="text-danger"
                        ></p>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={handleSubmitUpdate}
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
            <div className="col-12 text-left">
              <div className="col-12 my-5 p-0">
                <h4>Lịch sử đặt phòng</h4>
                <table className="table table-dark table-striped">
                  <thead style={{ textAlign: "center" }}>
                    <tr>
                      <th style={{ borderTop: "none" }}>Mã phòng</th>
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
