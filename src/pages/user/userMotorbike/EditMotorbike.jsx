import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../../services/config";
import { Button, Divider, Form, Input } from "antd";
import { ThemeContext } from "../../../context/theme.context";

function EditMotorbike() {
  const navigate = useNavigate();
  const [modelValue, setModelValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { darkTheme } = useContext(ThemeContext);

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
      navigate("/error");
    }
  };

  const styleHandler = {
    color: darkTheme ? "white" : "black",
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
          label={<label style={styleHandler}>Maker</label>}
          name="make"
        >
          <Input
            type="text"
            name="make"
            value={makeValue}
            onChange={handleMake}
          />
        </Form.Item>
        <Form.Item
          label={<label style={styleHandler}>Model</label>}
          name="model"
        >
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
        </Form.Item>
        <Form.Item label={<label style={styleHandler}>Year</label>} name="year">
          <Input
            type="number"
            name="year"
            onChange={handleYear}
            value={yearSelected}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Update
        </Button>
      </Form>
      <Divider />
    </div>
  );
}

export default EditMotorbike;
