import { Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userService } from "../../../services/userService";
import dayjs from "dayjs";

export default function EditUser() {
  const [gender, setGender] = useState("");
  const [userDetail, setUserDetail] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = async () => {
    const result = await userService.fetchUserDetailApi(params.userId);
    setUserDetail(result.data.content);
  };
  console.log(userDetail);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: params.userId,
      name: userDetail.name,
      email: userDetail.email,
      password: userDetail.password,
      phone: userDetail.phone,
      birthday: userDetail.birthday,
      gender: userDetail.gender,
      role: userDetail.role,
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

  const handleChangeDatePicker = (value) => {
    const birthday = dayjs(value).format("YYYY-MM-DD");
    formik.setFieldValue("birthday", birthday);
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
              value={formik.values.id}
              disabled
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
              value={formik.values.name}
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
              value={formik.values.email}
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
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="Số điện thoại"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Ngày sinh">
            <DatePicker
              size="large"
              format="DD/MM/YYYY"
              name="birthday"
              value={dayjs(formik.values.birthday, "DD/MM/YYYY")}
              onChange={(_, dateString) => {
                formik.setFieldValue("birthday", dateString);
              }}
              placeholder="Ngày sinh"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Giới tính">
            <Radio.Group
              name="gender"
              value={formik.values.gender}
              options={options}
              onChange={onChangeRadio}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Mật khẩu">
            <Input.Password
              name="password"
              size="large"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Mật khẩu"
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label="Loại người dùng">
            <Input
              name="role"
              size="large"
              value={formik.values.role}
              placeholder="Chọn loại người dùng"
            />
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary mr-2">
          Cập nhật
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
