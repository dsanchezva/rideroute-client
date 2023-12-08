import { Button, Divider, Form } from "antd";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../../context/theme.context";
import { useContext, useState } from "react";
import service from "../../../services/config";

function EditMotorbikeImage() {
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const [isUploading, setIsUploading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);

  const handleSubmitPicture = async (e) => {
    e.preventDefault();
    try {
      await service.patch("/user/editMotorbikePicture", {
        motoPicture: imageSelected,
      });
      navigate("/profile");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleImage = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("motoPicture", e.target.files[0]);

    try {
      const response = await service.patch(
        "/user/uploadMotoPicture",
        uploadData
      );
      setImageSelected(response.data.motoPicture);
      setIsUploading(false);
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
      <h1>Edit Motorbike Image</h1>
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
          label={<label style={styleHandler}>Motorbike image</label>}
          name="motoPicture"
        >
          <input
            type="file"
            name="motoPicture"
            accept="image/png, image/jpeg"
            onChange={handleImage}
            disabled={isUploading}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmitPicture}>
          Update motorbike picture
        </Button>
      </Form>
      <Divider />
      {imageSelected ? (
        <div>
          <img src={imageSelected} alt="img" width={200} />
        </div>
      ) : null}
    </div>
  );
}

export default EditMotorbikeImage;
