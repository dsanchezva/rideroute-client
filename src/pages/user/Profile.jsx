import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";
import { EditOutlined, PictureOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal } from "antd";

function Profile() {
  const navigate = useNavigate();
  const { loggedUser, authenticateUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getUserData = async () => {
    try {
      const user = await service.get("/user/details");
      setUserData(user.data.user);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  useState(() => {
    getUserData();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await service.delete("/user/delete");
      localStorage.removeItem("authToken");
      authenticateUser();
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  // Spinner cuando carga la imagen solo en el botón de carga de imagen  y deshabilitar botones de envío
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
  const {
    username,
    email,
    role,
    userPicture,
    motoMake,
    motoModel,
    motoYear,
    motoPicture,
  } = userData;

  const styleCards = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };

  const styleProfile = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "400px",
    boxShadow: "10px 10px 5px 0px rgba(45,54,214,1)",
  };

  const handleEditUser = () => {
    navigate("/editUser");
  };

  const handleEditUserPicture = () => {
    navigate("/editUserPicture");
  };

  const handleEditMoto = () => {
    navigate("/editMoto");
  };

  const handleEditMotoPicture = () => {
    navigate("/editMotoPicture");
  };

  return (
    <div>
      <h3>Profile</h3>
      <br />
      {/* User profile page*/}
      <div style={styleCards}>
        <Card
          style={styleProfile}
          cover={<img alt="ProfilePicture" src={userPicture} />}
          actions={[
            <EditOutlined key="edit" onClick={handleEditUser} />,
            <PictureOutlined key="picture" onClick={handleEditUserPicture} />,
          ]}
        >
          <p>Username : {username}</p>
          <p>Email : {email}</p>
          <p>Role : {role}</p>
        </Card>

        {/*End user profile page*/}
        <Card
          style={styleProfile}
          cover={<img alt="ProfilePicture" src={motoPicture} />}
          actions={[
            <EditOutlined key="edit" onClick={handleEditMoto} />,
            <PictureOutlined key="picture" onClick={handleEditMotoPicture} />,
          ]}
        >
          <p>Maker : {motoMake}</p>
          <p>Model : {motoModel}</p>
          <p>Year : {motoYear}</p>
        </Card>
      </div>
      <Divider />
      <Button type="primary" danger onClick={showModal}>
        Delete profile
      </Button>
      <Modal
        title="Delete profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you really want to delete your profile?</p>
        <Button type="primary" danger onClick={handleDelete}>
          Delete profile
        </Button>
      </Modal>
    </div>
  );
}

export default Profile;
