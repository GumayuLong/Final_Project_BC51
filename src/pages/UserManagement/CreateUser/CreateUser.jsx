import { Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
    },
    onSubmit: async (values) => {
      console.log({ values });
    },
  });

  const options = [
    {
      label: "Nam",
      value: false,
    },
    {
      label: "Nữ",
      value: true,
    },
  ];

  const onChangeRadio = ({ target: { value } }) => {
    setGender(value);
  };
  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
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
          <Form.Item label="Mã người dùng">
            <Input
              size="large"
              name="id"
              onChange={formik.handleChange}
              placeholder="Mã người dùng"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Họ và tên">
            <Input
              size="large"
              name="name"
              onChange={formik.handleChange}
              placeholder="Họ và tên"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Email">
            <Input
              size="large"
              name="email"
              onChange={formik.handleChange}
              placeholder="Email"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Số điện thoại">
            <Input
              size="large"
              name="phone"
              onChange={formik.handleChange}
              placeholder="Số điện thoại"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Ngày sinh">
            <DatePicker
              size="large"
              name="birthday"
              onChange={formik.handleChange}
              placeholder="Ngày sinh"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Giới tính">
            <Radio.Group
              options={options}
              onChange={onChangeRadio}
              value={gender}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Mật khẩu">
            <Input.Password
              size="large"
              name="matKhau"
              onChange={formik.handleChange}
              placeholder="Mật khẩu"
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label="Loại người dùng">
            <Select
              size="large"
              placeholder="Chọn loại người dùng"
              name="maLoaiNguoiDung"
            />
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary mr-2">
          Thêm mới
        </button>
        <button
          type="submit"
          className="btn btn-outline-primary"
          onClick={() => navigate("/admin/user")}
        >
          Trở lại
        </button>
      </div>
    </Form>
  );
}
