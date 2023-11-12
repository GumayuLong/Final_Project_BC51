import React, { useEffect, useState } from "react";
import { Button, Popover, Table, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import { positionService } from "../../services/positionService";

import "../../styles/styling.scss";

export default function PositionManagement() {
  const [positionList, setPositionList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPositionList();
  }, []);

  const fetchPositionList = async () => {
    const result = await positionService.fetchPositionListApi();

    setPositionList(result.data.content);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text, object) => <>{object.id}</>,
      width: 50,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, object) => <img src={object.hinhAnh} width={100} />,
    },
    {
      title: "Vị trí",
      dataIndex: "tenViTri",
      sorter: (a, b) => {
        let tenViTri1 = a.tenViTri.toLowerCase().trim();
        let tenViTri2 = b.tenViTri.toLowerCase().trim();
        if (tenViTri1 > tenViTri2) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tỉnh thành",
      dataIndex: "tinhThanh",
      sorter: (a, b) => {
        let tinhThanh1 = a.tinhThanh.toLowerCase().trim();
        let tinhThanh2 = b.tinhThanh.toLowerCase().trim();
        if (tinhThanh1 > tinhThanh2) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Quốc gia",
      dataIndex: "quocGia",
      sorter: (a, b) => {
        let tenViTri1 = a.tenViTri.toLowerCase().trim();
        let tenViTri2 = b.tenViTri.toLowerCase().trim();
        if (tenViTri1 > tenViTri2) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      width: 150,
      render: (text, object) => (
        <div className="btn-action">
          <Popover placement="bottom" content="Sửa">
            <NavLink
              key={1}
              className="mb-1"
              to={`/admin/position/edit/${object.id}`}
            >
              <button className="btn-icon text-info">
                <FontAwesomeIcon className="icon-size" icon={faPen} />
              </button>
            </NavLink>
          </Popover>

          <Popover placement="bottom" content="Xóa">
            <button
              className="btn-icon text-danger"
              onClick={() => handleDeletePosition(object)}
            >
              <FontAwesomeIcon className="icon-size" icon={faTrash} />
            </button>
          </Popover>
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

  const handleDeletePosition = async (object) => {
    const confirm = window.confirm(
      "Bạn có chắc muốn xóa vị trí số " + object.id + "?"
    );

    if (!confirm) return;
    try {
      await positionService.fetchDeletePositionApi(object.tenViTri);
      notification.success({
        message: "Xóa vị trí thành công",
        placement: "bottomRight",
      });

      const result = await positionService.fetchPositionListApi();
      setPositionList(result.data.content);
    } catch (error) {
      notification.error({
        message: "Xóa vị trí thất bại",
        placement: "bottomRight",
      });
    }
  };

  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Danh sách vị trí</h3>
        <Button
          onClick={handleAdd}
          className="d-flex align-items-center justify-content-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span style={{ fontSize: 16 }}>Thêm vị trí</span>
        </Button>
      </div>

      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={positionList}
        onChange={onChange}
      />
    </React.Fragment>
  );
}
