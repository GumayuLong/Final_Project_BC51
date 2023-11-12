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
import { useNavigate, useParams } from "react-router-dom";
import { positionService } from "../../../services/positionService";
import { departmentService } from "../../../services/departmentServices";

export default function EditDepartment() {
  const [state, setState] = useState({
    position: [],
  });
  const [department, setDepartment] = useState({});
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchDepartmentDetail();
    fetchPositionList();
  }, []);

  const fetchDepartmentDetail = async () => {
    const result = await departmentService.fetchDepartmentDetailApi(
      params.departmentId
    );

    setDepartment(result.data.content);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: params.departmentId,
      tenPhong: department.tenPhong,
      khach: department.khach,
      phongNgu: department.phongNgu,
      giuong: department.giuong,
      phongTam: department.phongTam,
      moTa: department.moTa,
      giaTien: department.giaTien,
      mayGiat: department.mayGiat,
      banLa: department.banLa,
      tivi: department.tivi,
      dieuHoa: department.dieuHoa,
      wifi: department.wifi,
      bep: department.bep,
      doXe: department.doXe,
      hoBoi: department.hoBoi,
      banUi: department.banUi,
      maViTri: department.maViTri,
      hinhAnh: department?.hinhAnh,
    },

    onSubmit: async (values) => {
      console.log({ values });

      try {
        await departmentService.fetchUpdateDepartmentApi(params.id, values);

        notification.success({
          message: "Cập nhật phòng thuê thành công!",
          placement: "bottomRight",
        });

        navigate("/admin/department");
      } catch (error) {
        notification.success({
          message: "Cập nhật phòng thuê thất bại!",
          placement: "bottomRight",
        });
      }
    },
  });

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

  const handleUploadFile = (event) => {
    let file = event.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImg(e.target.result);
      };

      formik.setFieldValue("img", file);
    }
  };

  return (
    <Fragment>
      <h4>Cập nhật phòng thuê</h4>
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
                value={formik.values.tenPhong}
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
                value={formik.values.maViTri}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Số khách">
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                name="khach"
                min={1}
                onChange={handleChangeValue("khach")}
                value={formik.values.khach}
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
                min={1}
                onChange={handleChangeValue("phongNgu")}
                value={formik.values.phongNgu}
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
                min={1}
                onChange={handleChangeValue("giuong")}
                value={formik.values.giuong}
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
                min={1}
                onChange={handleChangeValue("phongTam")}
                value={formik.values.phongTam}
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
                value={formik.values.giaTien}
                placeholder="Giá tiền"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Mô tả">
              <TextArea
                rows={6}
                size="large"
                name="moTa"
                onChange={formik.handleChange}
                value={formik.values.moTa}
                placeholder="Mô tả"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Máy giặt" valuePropName="checked">
              <Switch
                name="mayGiat"
                onChange={handleChangeValue("mayGiat")}
                value={formik.values.mayGiat}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Bàn là" valuePropName="checked">
              <Switch
                name="banLa"
                onChange={handleChangeValue("banLa")}
                value={formik.values.banLa}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Tivi" valuePropName="checked">
              <Switch
                name="tivi"
                onChange={handleChangeValue("tivi")}
                value={formik.values.tivi}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Điều hòa" valuePropName="checked">
              <Switch
                name="dieuHoa"
                onChange={handleChangeValue("dieuHoa")}
                value={formik.values.dieuHoa}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Wifi" valuePropName="checked">
              <Switch
                name="wifi"
                onChange={handleChangeValue("wifi")}
                value={formik.values.wifi}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Phòng bếp" valuePropName="checked">
              <Switch
                name="bep"
                onChange={handleChangeValue("bep")}
                value={formik.values.bep}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Nơi đỗ xe" valuePropName="checked">
              <Switch
                name="doXe"
                onChange={handleChangeValue("doXe")}
                value={formik.values.doXe}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Hồ bơi" valuePropName="checked">
              <Switch
                name="hoBoi"
                onChange={handleChangeValue("hoBoi")}
                value={formik.values.hoBoi}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item label="Bàn ủi" valuePropName="checked">
              <Switch
                name="banUi"
                onChange={handleChangeValue("banUi")}
                value={formik.values.banUi}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Hình ảnh">
              <input type="file" onChange={handleUploadFile} />
              <img className="mt-2" src={img} width={200} alt="" />
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
    </Fragment>
  );
}
