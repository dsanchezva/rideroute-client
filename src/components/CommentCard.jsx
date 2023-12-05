function CommentCard(props) {
  return (
    <div>
      <h3>User : {props.username}</h3>
      <p>{props.comment}</p>
    </div>
  );
}

export default CommentCard;
