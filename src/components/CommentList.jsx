import { useContext, useEffect, useState } from "react";
import service from "../services/config";
import CommentCard from "./CommentCard";
import { useNavigate } from "react-router";
import CommentCreate from "../pages/comment/CommentCreate";
import { AuthContext } from "../context/auth.context";
import { Button, Divider } from "antd";

function CommentList(props) {
  const navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [newCommentAdded, setNewCommentAdded] = useState(true);
  const { loggedUser } = useContext(AuthContext);

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
    setNewComment(!newComment);
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
      <div style={{ backgroundColor: "lightblue", padding: "100px" }}>
        <Button onClick={handleNewComment}>New Comment</Button>
        <Divider />
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
              userimage={eachComment.user.userPicture}
              comment={eachComment.comment}
              userId={eachComment.user._id}
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
