import { useEffect, useState } from "react";
import service from "../services/config";
import CommentCard from "./CommentCard";
import { useNavigate } from "react-router";
import CommentCreate from "../pages/comment/CommentCreate";

function CommentList(props) {
  const navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [newCommentAdded, setNewCommentAdded] = useState(true);
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

  useEffect(() => {
    if (newCommentAdded && getAllComments());
  }, [newCommentAdded]);

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
  if (allComments) {
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
          console.log(eachComment.user);
          return (
            <CommentCard
              key={index}
              username={eachComment.user.username}
              userimage={eachComment.user.userPicture}
              comment={eachComment.comment}
              getAllComments={getAllComments}
              _id={eachComment._id}
            />
          );
        })}
      </div>
    );
  }
}

export default CommentList;
