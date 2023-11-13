import React, { useEffect, useState } from "react";
import { Button, Table, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import "../../styles/styling.scss";
import dayjs from "dayjs";
import { bookRoomService } from "../../services/bookRoomService";

export default function BookedManagement() {
  const [bookedList, setBookedList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookedRoomList();
  }, []);

  const fetchBookedRoomList = async () => {
    const result = await bookRoomService.fetchBookedRoomFromUserApi();
    setBookedList(result.data.content);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text, object) => <>{object.id}</>,
      width: 50,
    },
    {
      title: "Mã phòng",
      dataIndex: "maPhong",
      sorter: (a, b) => {
        let maPhong1 = a.maPhong.toLowerCase().trim();
        let maPhong2 = b.maPhong.toLowerCase().trim();
        if (maPhong1 > maPhong2) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Số lượng khách",
      dataIndex: "soLuongKhach",
      render: (text, object) => <>{object.soLuongKhach}</>,
    },
    {
      title: "Người dùng",
      dataIndex: "maNguoiDung",
      render: (text, object) => <>{object.maNguoiDung}</>,
    },
    {
      title: "Ngày đến",
      dataIndex: "ngayDen",
      render: (text, object) => (
        <>{dayjs(object.ngayDen).format("DD/MM/YYYY")}</>
      ),
    },
    {
      title: "Ngày đi",
      dataIndex: "ngayDi",
      render: (text, object) => (
        <>{dayjs(object.ngayDi).format("DD/MM/YYYY")}</>
      ),
    },
    // {
    //   title: "Thao tác",
    //   dataIndex: "id",
    //   width: 150,
    //   render: (text, object) => (
    //     <div className="btn-action">
    //       <NavLink
    //         key={1}
    //         className="mb-1"
    //         to={`/admin/position/edit/${object.id}`}
    //       >
    //         <button className="btn-icon text-info">
    //           <FontAwesomeIcon className="icon-size" icon={faPen} />
    //         </button>
    //       </NavLink>

    //       <button
    //         className="btn-icon text-danger"
    //         onClick={() => handleDeletePosition(object)}
    //       >
    //         <FontAwesomeIcon className="icon-size" icon={faTrash} />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  //   const handleAdd = () => {
  //     navigate("create");
  //   };

  //   const handleDeletePosition = async (object) => {
  //     const confirm = window.confirm(
  //       "Bạn có chắc muốn xóa vị trí số " + object.id + "?"
  //     );

  //     if (!confirm) return;
  //     try {
  //       await positionService.fetchDeletePositionApi(object.id);
  //       notification.success({
  //         message: "Xóa vị trí thành công",
  //         placement: "bottomRight",
  //       });

  //       const result = await positionService.fetchBookedRoomListApi();
  //       setPositionList(result.data.content);
  //     } catch (error) {
  //       notification.error({
  //         message: "Xóa vị trí thất bại",
  //         placement: "bottomRight",
  //       });
  //     }
  //   };

  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Danh sách đặt phòng</h3>
        {/* <Button
          onClick={handleAdd}
          className="d-flex align-items-center justify-content-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span style={{ fontSize: 16 }}>Thêm vị trí</span>
        </Button> */}
      </div>

      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={bookedList}
        onChange={onChange}
      />
    </React.Fragment>
  );
}