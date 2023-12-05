import { useState } from "react";
import service from "../services/config";
import CommentCard from "./CommentCard";
import { useNavigate } from "react-router";
import CommentCreate from "../pages/comment/CommentCreate";

function CommentList(props) {
  const navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getAllComments = async () => {
    console.log("Obtengo comentarios");
    try {
      const comments = await service.get(
        `/comment/${props.routeId}/allComments`
      );
      setAllComments(comments.data.comments);
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

  if (allComments !== null) {
    return (
      <div style={{ backgroundColor: "lightblue" }}>
        <button onClick={handleNewComment}>New Comment</button>
        {newComment && (
          <CommentCreate
            addComment={setNewComment}
            getAllComments={getAllComments}
          />
        )}
        {allComments.map((eachComment, index) => {
          return (
            <CommentCard
              key={index}
              username={eachComment.user.username}
              comment={eachComment.comment}
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
          />
        )}
      </div>
    );
  }
}

export default CommentList;
