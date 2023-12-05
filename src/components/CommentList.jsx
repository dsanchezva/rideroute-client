import { useState } from "react";
import service from "../services/config";
import CommentCard from "./CommentCard";
import { useNavigate } from "react-router";

function CommentList(props) {
  const navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getAllComments = async () => {
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
      <div>
        {allComments.map((eachComment, index) => {
          console.log(eachComment);
          return (
            <CommentCard
              key={index}
              username={eachComment.user}
              comment={eachComment.comment}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h3>Be the first comment!</h3>
      </div>
    );
  }
}

export default CommentList;
