import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";

function UserEdit() {
  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailSelected] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { loggedUser } = useContext(AuthContext);
  const [imageSelected, setImageSelected] = useState(null);

  const handleUsernameChange = (e) => setUsernameValue(e.target.value);
  const handleEmailChange = (e) => setEmailSelected(e.target.value);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.patch("/user/editUser", {
        username: usernameValue,
        email: emailValue,
      });
      navigate("/profile");
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
      console.log(error);
      navigate("/error");
    }
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
      <h3>User Edit</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username : </label>
        <input
          type="text"
          name="username"
          value={usernameValue}
          onChange={handleUsernameChange}
        />
        <br />
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          name="email"
          value={emailValue}
          onChange={handleEmailChange}
        />
        <br />
        <button type="submit">Editar perfil</button>
      </form>
      <br />
      <form onSubmit={handleSubmitPicture}>
        <label htmlFor="userPicture">User image : </label>
        <input
          type="file"
          name="userPicture"
          accept="image/png, image/jpeg"
          onChange={handleImage}
          disabled={isUploading}
        />
        <br />
        <button type="submit">Update user picture</button>
      </form>
      <br />
      {imageSelected ? (
        <div>
          <img src={imageSelected} alt="img" width={200} />
        </div>
      ) : null}
    </div>
  );
}

export default UserEdit;
