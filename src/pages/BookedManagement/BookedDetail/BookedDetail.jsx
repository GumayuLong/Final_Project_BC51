import { Col, Form, Input, InputNumber, Row, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookRoomService } from "../../../services/bookRoomService";
import dayjs from "dayjs";
import { departmentService } from "../../../services/departmentServices";
import { result } from "lodash";
import { userService } from "../../../services/userService";

export default function BookedDetail() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [room, setRoom] = useState({});
  const [user, setUser] = useState({});
  const params = useParams();

  useEffect(() => {
    fetchBookedDetail();
    fetchDepartmentDetail();
    fetchUserDetail();
  }, []);

  const fetchBookedDetail = async () => {
    const result = await bookRoomService.fetchBookedDetailApi(params.id);
    setDetail(result.data.content);
  };

  //Lấy tên phòng theo mã phòng
  const fetchDepartmentDetail = async () => {
    const result = await departmentService.fetchDepartmentDetailApi(
      detail.maPhong
    );
    setRoom(result.data.content);
    console.log(room);
  };

  //Lấy tên người dùng theo mã người dùng
  const fetchUserDetail = async () => {
    const result = await userService.fetchUserDetailApi(detail.maNguoiDung);
    setUser(result.data.content);
    console.log(user);
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
