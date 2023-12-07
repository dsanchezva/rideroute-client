import { useNavigate, useParams } from "react-router";
import service from "../services/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

function CommentCard(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { loggedUser } = useContext(AuthContext);
  const [isOwner, setIsOwner] = useState(false);
  const styleComment = {
    padding: "20px",
    backgroundColor: "brown",
    border: "1px solid",
  };
  const styleButtons = {
    padding: "10px",
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await service.delete(`/comment/${props._id}/delete`);
      props.getAllComments();
      navigate(`/routeDetails/${params.routeId}`);
    } catch (error) {
      navigate("/error");
    }
  };
  const checkOwner = () => {
    if (props.userId === loggedUser._id) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };

  useEffect(() => {
    checkOwner();
  }, []);

  const handleEdit = () => {
    navigate(`/routeDetails/${params.routeId}/comment/${props._id}/edit`);
  };
  return (
    <div style={styleComment}>
      <span>
        User : {props.username}
        <div className="img-container-list">
          <img src={props.userimage} alt="userpicture" width={"80px"} />
        </div>
      </span>
      <p>{props.comment}</p>
      {isOwner && (
        <div style={styleButtons}>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default CommentCard;
