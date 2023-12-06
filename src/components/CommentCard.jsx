import { useNavigate, useParams } from "react-router";
import service from "../services/config";

function CommentCard(props) {
  const navigate = useNavigate();
  const params = useParams();
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

  const handleEdit = () => {
    navigate(`/routeDetails/${params.routeId}/comment/${props._id}/edit`);
  };
  console.log(props);
  return (
    <div style={styleComment}>
      <span>
        User : {props.username}{" "}
        <div className='img-container-list'>
        <img src={props.userimage} alt="userpicture" width={"80px"} />
        </div>
      </span>
      <p>{props.comment}</p>
      <div style={styleButtons}>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default CommentCard;
