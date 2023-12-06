import { useState } from "react";
import service from "../services/config";
import CommentCard from "./CommentCard";
import { useNavigate } from "react-router";
import CommentCreate from "../pages/comment/CommentCreate";

function CommentList(props) {
  const navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [newCommentAdded, setNewCommentAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getAllComments = async () => {
    try {
      const comments = await service.get(
        `/comment/${props.routeId}/allComments`
      );
      setAllComments(comments.data.comments);
      setNewCommentAdded(false);
      setIsLoading(false);
    } catch (error) {
      navigate(error);
    }
  };

  const handleNewComment = () => {
    setNewComment(true);
  };

  useState(() => {
    getAllComments();
  }, [newCommentAdded && getAllComments()]);

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
  if (
    typeof allComments != "undefined" &&
    allComments != null &&
    allComments.length != null &&
    allComments.length > 0
  ) {
    return (
      <div style={{ backgroundColor: "lightblue" }}>
        <button onClick={handleNewComment}>New Comment</button>

        {newComment && (
          <CommentCreate
            addComment={setNewComment}
            getAllComments={getAllComments}
            setNewCommentAdded={setNewCommentAdded}
          />
        )}
        {allComments.map((eachComment, index) => {
          return (
            <CommentCard
              key={index}
              username={eachComment.user.username}
              comment={eachComment.comment}
              getAllComments={getAllComments}
              _id={eachComment._id}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h3>Be the first comment!</h3>
        <button onClick={handleNewComment}>New Comment</button>
        {newComment && (
          <CommentCreate
            addComment={setNewComment}
            getAllComments={getAllComments}
            setNewCommentAdded={setNewCommentAdded}
          />
        )}
      </div>
    );
  }
}

export default CommentList;
