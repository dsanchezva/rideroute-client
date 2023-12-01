import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";

function RouteCreate() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //data to send to create
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("Spain");
  const [origin, setOrigin] = useState([]);
  const [destiny, setDestiny] = useState([]);
  //state handlers
  const handleDescription = (e) => setDescription(e.target.value);
  const handleCountry = (e) => setCountry();
  const handleOrigin = (e) => {
    const response = e.target.value;
    const convertToArr = response.split(",");
    const arrNumber = convertToArr.map((each) => Number(each));
    setOrigin(arrNumber);
  };
  const handleDestiny = (e) => {
    const response = e.target.value;
    const convertToArr = response.split(",");
    const arrNumber = convertToArr.map((each) => Number(each));
    setDestiny(arrNumber);
  };
  //search handlers
  const [searchOrigin, setSearchOrigin] = useState("");
  const handleSearchOrigin = (e) => setSearchOrigin(e.target.value);
  const [searchDestiny, setSearchDestiny] = useState("");
  const handleSearchDestiny = (e) => setSearchDestiny(e.target.value);

  //list handlers
  const [allOriginAddresses, setAllOriginAddresses] = useState([]);
  const [allDestinyAddresses, setAllDestinyAddresses] = useState([]);

  useEffect(() => {
    setUser(loggedUser._id);
  }, []);

  // Search the Origin address
  const handleSearchAdressOrigin = async (e) => {
    e.preventDefault();
    setSearchOrigin(e.target.value);
    try {
      const response = await service.patch("/routes/coordinates/searchOrigin", {
        name: searchOrigin,
        country,
      });
      const dataToRender = response.data.map((each) => {
        return {
          name: each.name,
          state: each.state,
          coordinates: [each.latitude, each.longitude],
        };
      });
      console.log(dataToRender);
      setAllOriginAddresses(dataToRender);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  // Search the Destiny address
  const handleSearchAdressDestiny = async (e) => {
    e.preventDefault();
    setSearchDestiny(e.target.value);
    try {
      const response = await service.patch(
        "/routes/coordinates/searchDestiny",
        { name: searchDestiny, country }
      );
      const dataToRender = response.data.map((each) => {
        return {
          name: each.name,
          state: each.state,
          coordinates: [each.latitude, each.longitude],
        };
      });
      setAllDestinyAddresses(dataToRender);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  // Send all the data to de BackEnd
  const handleSubmitAll = async (e) => {
    e.preventDefault();

    const routeData = {
      description,
      user,
      origin,
      destiny,
      country,
    };
    try {
      await service.post("/routes/create", routeData);
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h3>Create a new route</h3>

      <br />
      <label htmlFor="country">Country : </label>
      <input
        type="text"
        name="country"
        onChange={handleCountry}
        value={country}
      />
      <br />
      {/* search the adress origin */}
      <form onSubmit={handleSearchAdressOrigin}>
        <label htmlFor="origin">City Origin : </label>
        <input type="text" name="origin" onChange={handleSearchOrigin} />
        <button type="submit">Search</button>
      </form>
      <form>
        <select name="origin" onChange={handleOrigin}>
          <option>Select Origin Adress : </option>
          {allOriginAddresses.map((eachOrigin, index) => {
            return (
              <option key={index} value={eachOrigin.coordinates}>
                {eachOrigin.name} from {eachOrigin.state}
              </option>
            );
          })}
        </select>
      </form>
      {/* search the adress Destiny */}
      <form onSubmit={handleSearchAdressDestiny}>
        <label htmlFor="origin">City Destiny : </label>
        <input type="text" name="origin" onChange={handleSearchDestiny} />
        <button type="submit">Search</button>
      </form>
      <form>
        <select name="origin" onChange={handleDestiny}>
          <option>Select Destiny Adress : </option>
          {allDestinyAddresses.map((eachDestiny, index) => {
            return (
              <option key={index} value={eachDestiny.coordinates}>
                {eachDestiny.name} from {eachDestiny.state}
              </option>
            );
          })}
        </select>
      </form>
      <br />
      <form onSubmit={handleSubmitAll}>
        <label htmlFor="description">Description : </label>
        <textarea
          type="text"
          name="description"
          onChange={handleDescription}
          value={description}
        />
        <br />
        <button type="submit">Update All</button>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
}

export default RouteCreate;
