import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { ThemeContext } from "../../context/theme.context";
import { Button, Form } from "antd";
import { useNavigate } from "react-router";
import service from "../../services/config";

function UserEditImage() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const [imageSelected, setImageSelected] = useState(null);
  const handleImage = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("userPicture", e.target.files[0]);

    try {
      const response = await service.patch(
        "/user/uploadUserPicture",
        uploadData
      );
      setImageSelected(response.data.userPicture);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmitPicture = async (e) => {
    e.preventDefault();
    try {
      await service.patch("/user/editUserPicture", {
        userPicture: imageSelected,
      });
      navigate("/profile");
    } catch (error) {
      navigate("/error");
    }
  };

  const styleHandler = {
    color: darkTheme ? "white" : "black",
  };

  if (isUploading === true) {
    return (
      <div>
        <div id="loop" className={"center"}></div>
        <div id="bike-wrapper" className={"center"}>
          <div id="bike" className={"centerBike"}></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>User Edit Image</h1>
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
        <Form.Item
          label={<label style={styleHandler}>User image</label>}
          name="userPicture"
        >
          <input
            type="file"
            name="userPicture"
            accept="image/png, image/jpeg"
            onChange={handleImage}
            disabled={isUploading}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmitPicture}>
          Update user picture
        </Button>
      </Form>
      <br />
      {imageSelected ? (
        <div>
          <img src={imageSelected} alt="img" width={200} />
        </div>
      ) : null}
    </div>
  );
}

export default UserEditImage;
