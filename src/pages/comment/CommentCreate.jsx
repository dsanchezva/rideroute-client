import { useNavigate, useParams } from "react-router";
import service from "../../services/config";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Button, Form, Input } from "antd";
const { TextArea } = Input;

function CommentCreate(props) {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const params = useParams();
  const { darkTheme } = useContext(AuthContext);

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

  const styleHandler = {
    color: darkTheme ? "white" : "black",
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 6,
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
          rows={4}
          name="comment"
          cols="30"
          onChange={handleComment}
          value={newComment}
        />
        <Button type="primary" htmlType="submit" onClick={handleNewComent}>
          Create
        </Button>
      </Form>
    </div>
  );
}

export default CommentCreate;
