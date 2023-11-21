import { Col, Form, Input, Row, notification } from "antd";
import { useFormik } from "formik";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { positionService } from "../../../services/positionService";
import { loadingContext } from "../../../contexts/LoadingContext/LoadingContext";

export default function EditPosition() {
  const [img, setImg] = useState();
  const [positionDetail, setPositionDetail] = useState({});
  const [_, setLoadingContext] = useContext(loadingContext);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchPositionDetail();
  }, []);

  const fetchPositionDetail = async () => {
    setLoadingContext({ isLoading: true });
    const result = await positionService.fetchPositionDetailApi(
      params.positionId
    );
    setPositionDetail(result.data.content);
    setLoadingContext({ isLoading: false });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: params.positionId,
      tenViTri: positionDetail.tenViTri,
      tinhThanh: positionDetail.tinhThanh,
      quocGia: positionDetail.quocGia,
      hinhAnh: positionDetail?.hinhAnh,
    },

    onSubmit: async (values) => {
      let formData = new FormData();
      if (values.hinhAnh !== null) {
        formData.append("File", values.hinhAnh[0], values.hinhAnh.name);
      }

      try {
        await positionService.fetchUpdatePositionApi(params.positionId, values);
        await positionService.uploadImage(params.positionId);
        notification.success({
          message: "Cập nhật vị trí thành công!",
          placement: "bottomRight",
        });
        navigate("/admin/position");
      } catch (error) {
        notification.error({
          message: `${error.response?.data.content}`,
          placement: "bottomRight",
        });
      }
    },
  });

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

      formik.setFieldValue("avatar", file);
    }
  };

  return (
    <Fragment>
      <h4>Thêm vị trí</h4>
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
            <Form.Item label="Tên vị trí">
              <Input
                size="large"
                name="tenViTri"
                value={formik.values.tenViTri}
                onChange={formik.handleChange}
                placeholder="Tên vị trí"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Tỉnh thành">
              <Input
                size="large"
                name="tinhThanh"
                value={formik.values.tinhThanh}
                onChange={formik.handleChange}
                placeholder="Tỉnh thành"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Quốc gia">
              <Input
                size="large"
                name="quocGia"
                value={formik.values.quocGia}
                onChange={formik.handleChange}
                placeholder="Quốc gia"
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
            Lưu thay đổi
          </button>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={() => navigate("/admin/position")}
          >
            Trở lại
          </button>
        </div>
      </Form>
    </Fragment>
  );
}
