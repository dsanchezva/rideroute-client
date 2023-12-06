import { useEffect, useState } from "react";
import service from "../../services/config";
import { useNavigate, useParams } from "react-router";

function CommentEdit() {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const handleComment = (e) => setNewComment(e.target.value);
  const handleEditComment = async (e) => {
    e.preventDefault();
    try {
      await service.patch(`/comment/${params.commentId}/edit`, {
        comment: newComment,
      });
      navigate(`/routeDetails/${params.routeId}`);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const getComment = async () => {
    try {
      const response = await service.get(`/comment/${params.commentId}`);
      setNewComment(response.data.comment.comment);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
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
    <div>
      <form onSubmit={handleEditComment}>
        <label htmlFor="comment">Comment</label>
        <textarea
          name="comment"
          cols="30"
          rows="5"
          onChange={handleComment}
          value={newComment}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default CommentEdit;
