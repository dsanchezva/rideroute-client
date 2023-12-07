import { useNavigate, useParams } from "react-router";
import service from "../services/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function CommentCard(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { loggedUser } = useContext(AuthContext);
  const [actions, setActions] = useState([]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await service.delete(`/comment/${props._id}/delete`);
      props.getAllComments();
      navigate(`/routeDetails/${params.routeId}`);
    } catch (error) {
      navigate("/error");
    }
  };
  const checkOwner = () => {
    if (props.userId === loggedUser._id) {
      setActions([
        <EditOutlined key="edit" onClick={handleEdit} />,
        <DeleteOutlined key="delete" onClick={handleDelete} />,
      ]);
    }
  };

  useEffect(() => {
    checkOwner();
  }, []);

  const handleEdit = () => {
    navigate(`/routeDetails/${params.routeId}/comment/${props._id}/edit`);
  };

  return (
    <div>
      <Card style={{ width: 300, marginTop: 16 }} actions={actions}>
        <Meta
          avatar={<Avatar src={props.userimage} />}
          title={props.username}
          description={props.comment}
        />
      </Card>
    </div>
  );
}

export default CommentCard;
