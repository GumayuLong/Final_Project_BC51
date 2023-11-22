import { Col, DatePicker, Form, Input, Radio, Row, notification } from "antd";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userService } from "../../../services/userService";
import dayjs from "dayjs";
import { loadingContext } from "../../../contexts/LoadingContext/LoadingContext";

export default function EditUser() {
  const [gender, setGender] = useState("");
  const [userDetail, setUserDetail] = useState({});
  const [_, setLoadingContext] = useContext(loadingContext);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = async () => {
    setLoadingContext({ isLoading: true });
    const result = await userService.fetchUserDetailApi(params.userId);
    setUserDetail(result.data.content);
    setLoadingContext({ isLoading: false });
  };

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
      try {
        await userService.fetchUpdateUserApi(params.userId, values);
        notification.success({
          message: "Cập nhật người dùng thành công!",
          placement: "bottomRight",
        });
        navigate("/admin/user");
      } catch (error) {
        notification.error({
          message: "Cập nhật người dùng thất bại!",
          placement: "bottomRight",
        });
      }
    },
  });

  const options = [
    {
      label: "Nam",
      value: true,
    },
    {
      label: "Nữ",
      value: false,
    },
  ];

  const onChangeRadio = ({ target: { value } }) => {
    setGender(value);
    formik.setFieldValue("gender", value);
  };

  const handleChangeDatePicker = (value) => {
    const birthday = dayjs(value).format("YYYY-MM-DD");
    formik.setFieldValue("birthday", birthday);
  };

  const pattent = /^\d{4}-\d{2}-\d{2}$/;
  const renderDatePicker = () => {
    if (pattent.test(formik.values.birthday)) {
      return (
        <DatePicker
          name="birthday"
          format={"DD/MM/YYYY"}
          size="large"
          style={{ width: "100%" }}
          onChange={handleChangeDatePicker}
          value={dayjs(formik.values.birthday, "YYYY-MM-DD")}
        />
      );
    } else {
      return (
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
      );
    }
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
          <Form.Item label="Ngày sinh">{renderDatePicker()}</Form.Item>
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
              disabled
              name="role"
              size="large"
              value={formik.values.role}
            />
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary mr-2">
          Lưu thay đổi{" "}
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
