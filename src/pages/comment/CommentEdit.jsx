import { useEffect, useState } from "react";
import service from "../../services/config";
import { useNavigate, useParams } from "react-router";
import { Input } from "antd";
const { TextArea } = Input;

function CommentEdit() {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const handleComment = (e) => setNewComment(e.target.value);
  const handleEditComment = async (e) => {
    e.preventDefault();
    try {
      await service.patch(`/comment/${params.commentId}/edit`, {
        comment: newComment,
      });
      navigate(`/routeDetails/${params.routeId}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
        setIsLoading(false);
      } else {
        navigate("/error");
      }
    }
  };

  const getComment = async () => {
    try {
      const response = await service.get(`/comment/${params.commentId}`);
      setNewComment(response.data.comment.comment);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
        setIsLoading(false);
      } else {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    getComment();
  }, []);

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
    <div className="commentEdit-page">
      <form onSubmit={handleEditComment}>
        <label htmlFor="comment">Comment</label>
        <div className="editRoute-description">
          <TextArea
            rows={4}
            name="comment"
            cols="30"
            onChange={handleComment}
            value={newComment}
          />
        </div>
        <button type="submit">Edit</button>
      </form>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
}

export default CommentEdit;
