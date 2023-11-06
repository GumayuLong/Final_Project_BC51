<<<<<<< HEAD
/** @format */

=======
>>>>>>> 4539e0882f86f65d70ca9dc9b0f02cb0ccb643c9
import { Col, Form, Input, Row, notification } from "antd";
import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { positionService } from "../../../services/positionService";

export default function CreatePosition() {
<<<<<<< HEAD
	const [img, setImg] = useState();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			tenViTri: "",
			tinhThanh: "",
			quocGia: "",
			hinhAnh: "",
		},

		onSubmit: async (values) => {
			console.log({ values });
			try {
				await positionService.fetchCreatePositionApi(values);
				notification.success({
					message: "Tạo vị trí thành công!",
					placement: "bottomRight",
				});
				navigate("/admin/position");
			} catch (error) {
				notification.error({
					message: "Tạo vị trí thất bại!",
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
								onChange={formik.handleChange}
								placeholder="Số điện thoại"
							/>
						</Form.Item>
					</Col>
					<Col className="gutter-row" span={12}>
						<Form.Item label="Hình ảnh">
							<input type="file" onChange={handleUploadFile} />
							<img
								className="mt-2"
								src={img}
								width={200}
								alt=""
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
		</Fragment>
	);
=======
  const [img, setImg] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },

    onSubmit: async (values) => {
      console.log({ values });
      try {
        await positionService.fetchCreatePositionApi(values);
        notification.success({
          message: "Tạo vị trí thành công!",
          placement: "bottomRight",
        });
        navigate("/admin/position");
      } catch (error) {
        notification.error({
          message: "Tạo vị trí thất bại!",
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
                onChange={formik.handleChange}
                placeholder="Số điện thoại"
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
>>>>>>> 4539e0882f86f65d70ca9dc9b0f02cb0ccb643c9
}
