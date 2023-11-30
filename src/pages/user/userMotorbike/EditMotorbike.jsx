import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../../services/config";
import { AuthContext } from "../../../context/auth.context";

function EditMotorbike() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [modelValue, setModelValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [makeValue, setMakeValue] = useState("");
  const [modelSelected, setModelSelected] = useState("");
  const [yearSelected, setYearSelected] = useState(0);

  const handleMake = (e) => {
    setMakeValue(e.target.value);
  };

  const handleSelect = async () => {
    try {
      const response = await service.patch("/user/editMoto", {
        maker: makeValue,
      });
      setModelValue(response.data);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleYear = (e) => setYearSelected(e.target.value);

  const handleSelectOnChange = (e) => {
    setModelSelected(e.target.value);
  };

  useEffect(() => {
    handleSelect();
  }, [makeValue]);

  const handleSubmit = async () => {
    try {
      const response = await service.patch("user/editMotorbikeDetails", {
        make: makeValue,
        model: modelSelected.trim(),
        user: loggedUser,
        year: yearSelected,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isLoading === true) {
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
      <h1>EDIT MOTORBIKE</h1>
      <label htmlFor="make">Maker : </label>
      <input type="text" name="make" value={makeValue} onChange={handleMake} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="model">Model : </label>
        <select name="model" onChange={handleSelectOnChange}>
          <option value="">Select model : </option>
          {modelValue.map((eachModel, index) => {
            return (
              <option key={index} value={eachModel}>
                {eachModel}
              </option>
            );
          })}
        </select>
        <label htmlFor="year">Year : </label>
        <input
          type="number"
          name="year"
          onChange={handleYear}
          value={yearSelected}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditMotorbike;
