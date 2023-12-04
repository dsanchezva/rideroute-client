import { createContext, useEffect, useState } from "react";
import service from "../services/config";

const AuthContext = createContext();

const AuthWrapper = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);
  

  const authenticateUser = async () => {
    try {
      const response = await service.get("/user/verify");
      setIsLoggedIn(true);
      setLoggedUser(response.data.payload);
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const passedContext = {
    authenticateUser,
    isLoggedIn,
    loggedUser,
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
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
