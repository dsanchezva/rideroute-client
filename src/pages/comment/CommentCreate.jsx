import { useNavigate, useParams } from "react-router";
import service from "../../services/config";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";

function CommentCreate(props) {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const params = useParams();
  const { loggedUser } = useContext(AuthContext);

  const handleComment = (e) => setNewComment(e.target.value);

  const handleNewComent = async (e) => {
    e.preventDefault();
    try {
      service.post(`/comment/${params.routeId}/create`, {
        comment: newComment,
      });
      props.getAllComments();
      props.addComment(false);
      props.setNewCommentAdded(true);
      navigate(`/routeDetails/${params.routeId}`);
    } catch (error) {
      navigate("/home");
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="comment">Comment</label>
        <br />
        <textarea
          name="comment"
          cols="30"
          rows="5"
          onChange={handleComment}
          value={newComment}
        ></textarea>
        <br />
        <button onClick={handleNewComent}>Create</button>
      </form>
    </div>
  );
}

export default CommentCreate;
