import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";
import { ThemeContext } from "../../context/theme.context";
import { Button, Divider, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

function RouteCreate() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { darkTheme } = useContext(ThemeContext);

  //data to send to create
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("Spain");
  const [origin, setOrigin] = useState([]);
  const [originSelect, setOriginSelect] = useState([]);
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
    handleOptions();
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
      handleOptions();

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
  //theme dark and light
  const styleHandler = {
    color: darkTheme ? "white" : "black",
  };
  // change the received data to visualize and save the coordinates
  const handleOptions = () => {
    let optionsArray = [];
    allOriginAddresses.map((eachOrigin) => {
      optionsArray.push({
        value: eachOrigin.coordinates,
        label: `${eachOrigin.name} from ${eachOrigin.state}`,
      });
    });
    setOriginSelect(optionsArray);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Create a new route</h3>

      <br />
      <Form.Item
        label={<label style={styleHandler}>Country </label>}
        name="country"
      >
        <Input
          type="text"
          name="country"
          onChange={handleCountry}
          defaultValue={country}
        />
      </Form.Item>
      {/* search the adress origin */}
      <Form>
        <Form.Item
          label={<label style={styleHandler}>City Origin </label>}
          name="origin"
        >
          <Input type="text" name="origin" onChange={handleSearchOrigin} />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSearchAdressOrigin}
        >
          Search
        </Button>
      </Form>
      <Divider />

      <Form>
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
      </Form>
      <Divider />

      {/* search the adress Destiny */}
      <Form>
        <Form.Item
          label={<label style={styleHandler}>City Destiny </label>}
          name="destiny"
        >
          <Input type="text" name="destiny" onChange={handleSearchDestiny} />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSearchAdressDestiny}
        >
          Search
        </Button>
      </Form>
      <Divider />

      <Form>
        <select name="destiny" onChange={handleDestiny}>
          <option>Select Destiny Adress : </option>
          {allDestinyAddresses.map((eachDestiny, index) => {
            return (
              <option key={index} value={eachDestiny.coordinates}>
                {eachDestiny.name} from {eachDestiny.state}
              </option>
            );
          })}
        </select>
      </Form>
      <Divider />

      <Form>
        <Form.Item
          label={<label style={styleHandler}>Description </label>}
          name="description"
        >
          <TextArea
            rows={4}
            cols="40"
            name="description"
            onChange={handleDescription}
            value={description}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmitAll}>
          Create route
        </Button>
      </Form>
      <p>{errorMessage}</p>
    </div>
  );
}

export default RouteCreate;
