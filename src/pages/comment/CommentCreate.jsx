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
      const comment = service.post(`/comment/${params.routeId}/create`, {
        comment: newComment,
      });
      props.addComment(false);
      navigate(`/routeDetails/${params.routeId}`);
    } catch (error) {
      console.log(error);
      navigate("/home");
    }
  };

  return (
    <div>
      <form onSubmit={handleNewComent}>
        <label htmlFor="comment">Comment</label>
        <textarea
          name="comment"
          cols="30"
          rows="10"
          onChange={handleComment}
          value={newComment}
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CommentCreate;
