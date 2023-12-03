import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";

function Profile() {
  const navigate = useNavigate();
  const { loggedUser, authenticateUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    try {
      const user = await service.post("/user/details", {
        user: loggedUser,
      });
      setUserData(user.data.user);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  useState(() => {
    getUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.post("/user/delete", {
        user: loggedUser,
      });
      localStorage.removeItem("authToken");

      authenticateUser();

      navigate("/");
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

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

  const styleProfile = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  };
  return (
    <div>
      <h3>Profile</h3>
      <br />
      {/* User profile page*/}
      <div style={styleProfile}>
        <div>
          <h3>User Details</h3>
          <img
            src={userPicture}
            alt="ProfilePicture"
            width="200px"
            height="150px"
          />
          <br />
          <p>Username : {username}</p>
          <p>Email : {email}</p>
          <p>Role : {role}</p>
          <div>
            <Link to={"/editUser"}>
              <button>User edit</button>
            </Link>
          </div>
        </div>
        <div>
          <h3>Motorbike Details</h3>
          <img
            src={motoPicture}
            alt="MotorbikePicture"
            width="200px"
            height="150px"
          />
          <br />
          <p>Maker : {motoMake}</p>
          <p>Model : {motoModel}</p>
          <p>Year : {motoYear}</p>
          <div>
            <Link to={"/editMoto"}>
              <button>Motorbike edit</button>
            </Link>
          </div>
        </div>
      </div>
      {/*End user profile page*/}
      <br />
      <form onSubmit={handleSubmit}>
        <button type="submit" style={{ backgroundColor: "red" }}>
          Delete profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
