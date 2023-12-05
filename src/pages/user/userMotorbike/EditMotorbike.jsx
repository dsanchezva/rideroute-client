import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../../services/config";

function EditMotorbike() {
  const navigate = useNavigate();
  const [modelValue, setModelValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const [makeValue, setMakeValue] = useState("");
  const [modelSelected, setModelSelected] = useState("");
  const [yearSelected, setYearSelected] = useState(0);
  const [imageSelected, setImageSelected] = useState(null);

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
  const handleSelectOnChange = (e) => setModelSelected(e.target.value);

  useEffect(() => {
    handleSelect();
  }, [makeValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.patch("/user/editMotorbikeDetails", {
        make: makeValue,
        model: modelSelected.trim(),
        year: yearSelected,
      });
      navigate("/profile");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
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

  if (isLoading === true || isUploading === true) {
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="make">Maker : </label>
        <input
          type="text"
          name="make"
          value={makeValue}
          onChange={handleMake}
        />
        <br />
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
        <br />
        <label htmlFor="year">Year : </label>
        <input
          type="number"
          name="year"
          onChange={handleYear}
          value={yearSelected}
        />
        <br />
        <button type="submit">Update</button>
        <br />
        <br />
      </form>
      <form onSubmit={handleSubmitPicture}>
        <label htmlFor="motoPicture">Motorbike image : </label>
        <input
          type="file"
          name="motoPicture"
          accept="image/png, image/jpeg"
          onChange={handleImage}
          disabled={isUploading}
        />

        <br />
        <button type="submit">Update motorbike picture</button>
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

export default EditMotorbike;
