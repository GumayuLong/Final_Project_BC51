import React, { useEffect, useState, useContext } from "react";
import { loadingContext } from "../../contexts/LoadingContext/LoadingContext";
import { Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import "./style.scss";
import { positionService } from "../../services/positionService";

export default function ListRoomByLocate() {
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useContext(loadingContext);
  const [listRoomByLocate, setListRoomByLocate] = useState([]);
  const fetchListRoomByLocate = async () => {
    setLoadingState({ isLoading: true });
    const result = await positionService.fetchPositionListApi();
    setListRoomByLocate(result.data.content);
    setLoadingState({ isLoading: false });
  };
  useEffect(() => {
    fetchListRoomByLocate();
  }, []);
  const renderListRoomByLocate = () => {
    return listRoomByLocate.map((element) => {
      return (
        <Col key={element.id} span={8}>
          <Card
            onClick={() => {
              navigate(`/detail/${element.id}`);
            }}
            hoverable
            cover={<img alt="example" src={element.hinhAnh} />}
          >
            <Meta title={element.tinhThanh} description={element.tenViTri} />
          </Card>
        </Col>
      );
    });
  };
  return (
    <Row gutter={24}>
      <Col span={12}>
        <Row gutter={[16, 48]} justify="space-evenly">
          {renderListRoomByLocate()}
        </Row>
      </Col>
      <Col span={12}>
        <iframe
        className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15745336.99261533!2d95.23807143415631!3d15.534033781769216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2zVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1700280623822!5m2!1svi!2s"
          loading="lazy"
        ></iframe>
      </Col>
    </Row>
  );
}
