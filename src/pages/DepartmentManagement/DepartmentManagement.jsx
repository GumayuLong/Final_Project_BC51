<<<<<<< HEAD
/** @format */

=======
>>>>>>> 4539e0882f86f65d70ca9dc9b0f02cb0ccb643c9
import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import { departmentService } from "../../services/departmentServices";

import "../../styles/styling.scss";

export default function DepartmentManagement() {
<<<<<<< HEAD
	const [departmentList, setDepartmentList] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		fetchDepartmentList();
	}, []);

	const fetchDepartmentList = async () => {
		const result = await departmentService.fetchDepartmentListApi();

		setDepartmentList(result.data.content);
	};

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			render: (text, object) => <>{object.id}</>,
		},
		{
			title: "Hình ảnh",
			dataIndex: "hinhAnh",
			render: (text, object) => <img src={object.hinhAnh} height={120} />,
		},
		{
			title: "Tên phòng",
			dataIndex: "tenPhong",
			sorter: (a, b) => {
				let tenPhong1 = a.tenPhong.toLowerCase().trim();
				let tenPhong2 = b.tenPhong.toLowerCase().trim();
				if (tenPhong1 > tenPhong2) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Mô tả",
			dataIndex: "moTa",
			render: (text, object) => (
				<Fragment>
					{object.moTa.length > 200
						? object.moTa.substr(0, 200) + "..."
						: object.moTa}
				</Fragment>
			),
			width: 550,
		},
		{
			title: "Thao tác",
			dataIndex: "id",
			width: 150,
			render: (text, object) => (
				<div className="btn-action">
					<NavLink
						key={1}
						className="mb-1"
						to={`/admin/user/edit/${object.id}`}
					>
						<button className="btn-icon text-info">
							<FontAwesomeIcon
								className="icon-size"
								icon={faPen}
							/>
						</button>
					</NavLink>

					<button
						className="btn-icon text-danger"
						onClick={() => handleDeleteUser(object)}
					>
						<FontAwesomeIcon className="icon-size" icon={faTrash} />
					</button>
				</div>
			),
		},
	];

	const onChange = (pagination, filters, sorter, extra) => {
		console.log("params", pagination, filters, sorter, extra);
	};

	const handleAdd = () => {
		navigate("create");
	};

	const handleDeleteUser = async (object) => {
		const confirm = window.confirm(
			"Bạn có chắc muốn xóa phòng thuê số " + object.id + "?"
		);

		if (!confirm) return;
		try {
			await departmentService.fetchDeleteDepartmentApi(object.id);
			notification.success({
				message: "Xóa phòng thuê thành công",
				placement: "bottomRight",
			});

			const result = await departmentService.fetchDepartmentListApi();
			setDepartmentList(result.data.content);
		} catch (error) {
			notification.error({
				message: "Xóa phòng thuê thất bại",
				placement: "bottomRight",
			});
		}
	};

	return (
		<React.Fragment>
			<div className="d-flex align-items-center justify-content-between">
				<h3>Danh sách phòng thuê</h3>
				<Button
					onClick={handleAdd}
					className="d-flex align-items-center justify-content-center"
				>
					<FontAwesomeIcon icon={faPlus} className="mr-2" />
					<span style={{ fontSize: 16 }}>Thêm phòng thuê</span>
				</Button>
			</div>

			<Table
				rowKey={"id"}
				columns={columns}
				dataSource={departmentList}
				onChange={onChange}
			/>
		</React.Fragment>
	);
=======
  const [departmentList, setDepartmentList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartmentList();
  }, []);

  const fetchDepartmentList = async () => {
    const result = await departmentService.fetchDepartmentListApi();

    setDepartmentList(result.data.content);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text, object) => <>{object.id}</>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, object) => <img src={object.hinhAnh} height={120} />,
    },
    {
      title: "Tên phòng",
      dataIndex: "tenPhong",
      sorter: (a, b) => {
        let tenPhong1 = a.tenPhong.toLowerCase().trim();
        let tenPhong2 = b.tenPhong.toLowerCase().trim();
        if (tenPhong1 > tenPhong2) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, object) => (
        <Fragment>
          {object.moTa.length > 200
            ? object.moTa.substr(0, 200) + "..."
            : object.moTa}
        </Fragment>
      ),
      width: 550,
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      width: 150,
      render: (text, object) => (
        <div className="btn-action">
          <NavLink
            key={1}
            className="mb-1"
            to={`/admin/user/edit/${object.id}`}
          >
            <button className="btn-icon text-info">
              <FontAwesomeIcon className="icon-size" icon={faPen} />
            </button>
          </NavLink>

          <button
            className="btn-icon text-danger"
            onClick={() => handleDeleteUser(object)}
          >
            <FontAwesomeIcon className="icon-size" icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleAdd = () => {
    navigate("create");
  };

  const handleDeleteUser = async (object) => {
    const confirm = window.confirm(
      "Bạn có chắc muốn xóa phòng thuê số " + object.id + "?"
    );

    if (!confirm) return;
    try {
      await departmentService.fetchDeleteDepartmentApi(object.id);
      notification.success({
        message: "Xóa phòng thuê thành công",
        placement: "bottomRight",
      });

      const result = await departmentService.fetchDepartmentListApi();
      setDepartmentList(result.data.content);
    } catch (error) {
      notification.error({
        message: "Xóa phòng thuê thất bại",
        placement: "bottomRight",
      });
    }
  };

  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Danh sách phòng thuê</h3>
        <Button
          onClick={handleAdd}
          className="d-flex align-items-center justify-content-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span style={{ fontSize: 16 }}>Thêm phòng thuê</span>
        </Button>
      </div>

      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={departmentList}
        onChange={onChange}
      />
    </React.Fragment>
  );
>>>>>>> 4539e0882f86f65d70ca9dc9b0f02cb0ccb643c9
}
