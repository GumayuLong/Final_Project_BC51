import React from "react";
import { useNavigate } from "react-router-dom";
import useRoomList from "../../hooks/useRoomList";
import { Card } from "antd";
const { Meta } = Card;
export default function Home() {
  const navigate = useNavigate();
  const roomList = useRoomList();

  const renderRoomList = () => {
    return roomList.map((element) => {
      return (
        <div
          key={element.id}
          className="col-12 col-sm-12 col-md-6 col-xl-4 mt-5"
        >
          <Card
            onClick={() => {
              navigate(`/detail/${element.id}`);
            }}
            hoverable
            cover={
              <img
                alt="example"
                src={element.hinhAnh}
                width={250}
                height={150}
                style={{ objectFit: "cover", objectPosition: "bottom" }}
              />
            }
          >
            <Meta
              title={element.tenPhong}
              description={`Member: ${element.khach}
                Price: ${element.giaTien}$
                `}
            />
          </Card>
        </div>
      );
    });
  };
  return (
    <div className="py-5 container">
      <div className="row mx-auto">{renderRoomList()}</div>
    </div>
  );
}
