import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { positionService } from "../../../services/positionService";
import { departmentService } from "../../../services/departmentServices";

export default function CreateDepartment() {
  const [state, setState] = useState({
    position: [],
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: 0,
      tenPhong: "",
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      moTa: "",
      giaTien: 0,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: true,
      wifi: true,
      bep: true,
      doXe: true,
      hoBoi: true,
      banUi: true,
      maViTri: 0,
      hinhAnh: "",
    },

    onSubmit: async (values) => {
      try {
        await departmentService.fetchCreateDepartmentApi(values);

        notification.success({
          message: "Thêm phòng thuê thành công!",
          placement: "bottomRight",
        });
        navigate("/admin/department");
      } catch (error) {
        notification.error({
          message: `${error.response?.data.content}`,
          placement: "bottomRight",
        });
      }
    },
  });

  useEffect(() => {
    fetchPositionList();
  }, []);

  const fetchPositionList = async () => {
    try {
      const result = await positionService.fetchPositionListApi();
      setState({ ...state, position: result.data.content });
    } catch (error) {}
  };

  const selectPosition = () => {
    return state.position?.map((element) => {
      return {
        label: element.tenViTri,
        value: element.id,
      };
    });
  };

  const handleChangePosition = (value) => {
    formik.setFieldValue("maViTri", value);
  };

  const handleChangeValue = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  return (
    <Fragment>
      <h4>Thêm phòng thuê</h4>
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
            <Form.Item label="Tên phòng">
              <Input
                size="large"
                name="tenPhong"
                onChange={formik.handleChange}
                placeholder="Tên phòng"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Vị trí">
              <Select
                options={selectPosition()}
                size="large"
                placeholder="Chọn vị trí"
                onChange={handleChangePosition}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Số khách">
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                name="khach"
                onChange={handleChangeValue("khach")}
                placeholder="Số khách"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Số phòng ngủ">
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                name="phongNgu"
                onChange={handleChangeValue("phongNgu")}
                placeholder="Số phòng ngủ"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Số giường">
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                name="giuong"
                onChange={handleChangeValue("giuong")}
                placeholder="Số giường"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Số phòng tắm">
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                name="phongTam"
                onChange={handleChangeValue("phongTam")}
                placeholder="Số phòng tắm"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Giá tiền">
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                name="giaTien"
                min={0}
                onChange={handleChangeValue("giaTien")}
                placeholder="Giá tiền"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Mô tả">
              <TextArea
                rows={3}
                size="large"
                name="moTa"
                onChange={formik.handleChange}
                placeholder="Mô tả"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Máy giặt" valuePropName="checked">
              <Switch name="mayGiat" onChange={handleChangeValue("mayGiat")} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Bàn là" valuePropName="checked">
              <Switch name="banLa" onChange={handleChangeValue("banLa")} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Tivi" valuePropName="checked">
              <Switch name="tivi" onChange={handleChangeValue("tivi")} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Điều hòa" valuePropName="checked">
              <Switch name="dieuHoa" onChange={handleChangeValue("dieuHoa")} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Wifi" valuePropName="checked">
              <Switch name="wifi" onChange={handleChangeValue("wifi")} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Phòng bếp" valuePropName="checked">
              <Switch name="bep" onChange={handleChangeValue("bep")} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Nơi đỗ xe" valuePropName="checked">
              <Switch name="doXe" onChange={handleChangeValue("doXe")} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Hồ bơi" valuePropName="checked">
              <Switch name="hoBoi" onChange={handleChangeValue("hoBoi")} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Bàn ủi" valuePropName="checked">
              <Switch name="banUi" onChange={handleChangeValue("banUi")} />
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
            onClick={() => navigate("/admin/department")}
          >
            Trở lại
          </button>
        </div>
      </Form>
    </Fragment>
  );
}
