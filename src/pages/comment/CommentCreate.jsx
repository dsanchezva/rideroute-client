import { useNavigate, useParams } from "react-router";
import service from "../../services/config";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Input } from 'antd';
const { TextArea } = Input;

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
        <div className="editRoute-description">
        <TextArea 
          rows={4}
          name="comment"
          cols="30"
          onChange={handleComment}
          value={newComment}
        />
        </div>
        <br />
        <button onClick={handleNewComent}>Create</button>
      </form>
    </div>
  );
}

export default CommentCreate;
