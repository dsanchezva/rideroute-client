import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import RouteMap from "../../components/RouteMap";

function RouteDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { loggedUser } = useContext(AuthContext);
  const [routeDetails, setRouteDetails] = useState(null);
  const [newComment, setNewComment] = useState(false);
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

  const handleNewComment = () => {
    setNewComment(true);
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
    <div className="detail-page-container">
      <h3>Details</h3>
      <div className="routeInfo-user">
        <div className="routeInfo-user-data">
        <h4>{routeDetails.user.username}</h4>
        <img src={routeDetails.user.userPicture} alt="user-picture" />
        </div>
        <div className="routeInfo-moto">
        <h4>{routeDetails.user.motoMake} {routeDetails.user.motoModel}</h4>
        <img src={routeDetails.user.motoPicture} alt="user-moto-picture" />
        </div>
      </div>
      <div>
        
        <p>{routeDetails.description}</p>
        <div>
          <RouteMap
            origin={routeDetails.origin}
            destiny={routeDetails.destiny}
          />
        </div>
         <div className="details-owner-btn">
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
      </div>
      <div>
        <h3>Comentarios aqui</h3>
        <CommentList routeId={params.routeId} />
        <button onClick={handleNewComment}>New Comment</button>
        {newComment && <CommentCreate addComment={setNewComment} />}
      </div>
    </div>
  );
}
import { AuthContext } from "../../context/auth.context";
import CommentList from "../../components/CommentList";
import CommentCreate from "../comment/CommentCreate";

export default RouteDetails;
