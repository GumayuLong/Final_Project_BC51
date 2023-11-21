import { Col, Form, Input, Row } from "antd";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookRoomService } from "../../../services/bookRoomService";
import dayjs from "dayjs";
import { departmentService } from "../../../services/departmentServices";
import { userService } from "../../../services/userService";
import { loadingContext } from "../../../contexts/LoadingContext/LoadingContext";

export default function BookedDetail() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [room, setRoom] = useState({});
  const [user, setUser] = useState({});
  const [_, setLoadingContext] = useContext(loadingContext);
  const params = useParams();

  useEffect(() => {
    fetchBookedDetail();
  }, []);

  const fetchBookedDetail = async () => {
    setLoadingContext({ isLoading: true });
    const result = await bookRoomService.fetchBookedDetailApi(params.id);
    console.log(result.data.content);
    setDetail(result.data.content);
    setLoadingContext({ isLoading: false });
  };

  useEffect(() => {
    if (detail.maPhong) {
      fetchDepartmentDetail(detail.maPhong);
    }
  }, [detail.maPhong]);

  //Lấy tên phòng theo mã phòng
  const fetchDepartmentDetail = async (maPhong) => {
    const result = await departmentService.fetchDepartmentDetailApi(maPhong);
    setRoom(result.data.content);
  };

  useEffect(() => {
    if (detail.maNguoiDung) {
      fetchUserDetail(detail.maNguoiDung);
    }
  }, [detail.maNguoiDung]);

  //Lấy tên người dùng theo mã người dùng
  const fetchUserDetail = async (maNguoiDung) => {
    const result = await userService.fetchUserDetailApi(maNguoiDung);
    setUser(result.data.content);
  };

  return (
    <Fragment>
      <h4>Chi tiết đặt phòng</h4>
      <Form
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 100,
        }}
        layout="vertical"
        style={{
          maxWidth: 1000,
        }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Tên phòng">
              <Input size="large" name="maPhong" value={room.tenPhong} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Ngày đến">
              <Input
                size="large"
                name="ngayDen"
                value={dayjs(detail.ngayDen).format("DD/MM/YYYY")}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Ngày đi">
              <Input
                size="large"
                name="ngayDi"
                value={dayjs(detail.ngayDi).format("DD/MM/YYYY")}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Khách đặt">
              <Input size="large" name="maNguoiDung" value={user.name} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Số lượng khách">
              <Input
                size="large"
                name="soLuongKhach"
                value={detail.soLuongKhach}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={() => navigate("/admin/booked")}
          >
            Trở lại
          </button>
        </div>
      </Form>
    </Fragment>
  );
}
