import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import RouteMap from "../../components/RouteMap";
import { AuthContext } from "../../context/auth.context";
import CommentList from "../../components/CommentList";

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

  return (
    <div>
      <h3>Details</h3>
      <div>
        <h4>{routeDetails.user.username}</h4>
        <img src={routeDetails.user.motoPicture} alt="user-moto-picture" />
      </div>
      <div>
        <h5>{routeDetails.country}</h5>
        <p>{routeDetails.description}</p>
        <div>
          <RouteMap
            origin={routeDetails.origin}
            destiny={routeDetails.destiny}
          />
        </div>
        {isOwner ? (
          <button onClick={handleDeleteRoute}>Delete Route</button>
        ) : (
          <></>
        )}
        {isOwner ? (
          <button onClick={handleUpdateRoute}>Edit Route</button>
        ) : (
          <></>
        )}
      </div>
      <div>
        <h3>Comentarios aqui</h3>
        <CommentList routeId={params.routeId} />
      </div>
    </div>
  );
}

export default RouteDetails;
