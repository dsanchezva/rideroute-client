import { useContext, useEffect, useState } from "react";
import service from "../../services/config";
import { useNavigate, useParams } from "react-router";
import { Button, Form, Input } from "antd";
import { AuthContext } from "../../context/auth.context";
const { TextArea } = Input;

function CommentEdit() {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const { darkTheme } = useContext(AuthContext);
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

  const styleHandler = {
    color: darkTheme ? "white" : "black",
  };

  return (
    <div className="commentEdit-page">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        initialValues={{
          remember: true,
        }}
      >
        <TextArea
          rows={10}
          name="comment"
          cols="200"
          onChange={handleComment}
          value={newComment}
        />
        <Button type="primary" htmlType="submit" onClick={handleEditComment}>
          Edit
        </Button>
      </Form>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
}

export default CommentEdit;
