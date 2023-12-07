import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import RouteMap from "../../components/RouteMap";
import { AuthContext } from "../../context/auth.context";
import CommentList from "../../components/CommentList";
import { Avatar, Card, Divider } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

function RouteDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { loggedUser } = useContext(AuthContext);
  const [routeDetails, setRouteDetails] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  //search the route id the DB
  const getData = async () => {
    try {
      const response = await service.get(`/routes/${params.routeId}/info`);
      setRouteDetails(response.data);
      if (response.data.user._id === loggedUser._id) {
        setIsOwner(true);
      }
      setIsLoading(false);
    } catch (err) {}
  };

  const handleDeleteRoute = async () => {
    try {
      await service.delete(`/routes/${params.routeId}/delete`);
      navigate("/home");
    } catch (err) {}
  };
  const handleUpdateRoute = () => {
    navigate(`/routeEdit/${routeDetails._id}`);
  };
  if (isLoading) {
    return (
      <div>
        <div id="loop" className={"center"}></div>
        <div id="bike-wrapper" className={"center"}>
          <div id="bike" className={"centerBike"}></div>
        </div>
      </div>
    );
  }
  const { username, motoMake, motoModel } = routeDetails.user;

  return (
    <div className="detail-page-container">
      <Card
        style={{
          width: 800,
        }}
        cover={
          <RouteMap
            origin={routeDetails.origin}
            destiny={routeDetails.destiny}
          />
        }
        actions={
          isOwner && [
            <EditOutlined key="edit" onClick={handleUpdateRoute} />,
            <DeleteOutlined key="delete" onClick={handleDeleteRoute} />,
          ]
        }
      >
        <Divider />
        <Meta
          avatar={<Avatar src={routeDetails.user.userPicture} />}
          title={`${username}`}
        />
        <Divider />
        <Meta
          avatar={<Avatar src={routeDetails.user.motoPicture} />}
          title={`${motoMake} ${motoModel}`}
        />
        <Divider />
        <Meta description={routeDetails.description} />
      </Card>
      <div>
        <CommentList routeId={params.routeId} />
      </div>
    </div>
  );
}

export default RouteDetails;
