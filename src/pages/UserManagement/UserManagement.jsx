import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { userService } from "../../services/userService";

export default function UserManagement() {
  const [userList, setUserList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    const result = await userService.fetchUserListApi();

    setUserList(result.data.content);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      render: (text, object) => <>{object.id}</>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (text, object) => <img src={object.avatar} width={60} />,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      sorter: (a, b) => {
        let name1 = a.name.toLowerCase().trim();
        let name2 = b.name.toLowerCase().trim();
        if (name1 > name2) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, object) => <>{object.email}</>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (text, object) => <>{object.gender ? "Nữ" : "Nam"}</>,
    },

    {
      title: "Role",
      dataIndex: "role",
      render: (text, object) => (
        <>{object.role === "ADMIN" ? "Quản trị" : "Khách hàng"}</>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Danh sách người dùng</h3>
        <Button
          // onClick={handleAdd}
          className="d-flex align-items-center justify-content-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span style={{ fontSize: 16 }}>Thêm người dùng</span>
        </Button>
      </div>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={userList}
        onChange={onChange}
      />
    </React.Fragment>
  );
}
