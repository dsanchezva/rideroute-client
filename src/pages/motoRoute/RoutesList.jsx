import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import RouteCard from "../../components/RouteCard";
import { Pagination, ConfigProvider, Divider, Input, Form, Space } from "antd";
import { ThemeContext } from "../../context/theme.context";
const { Search } = Input;

function RoutesList() {
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const [allRoutes, setAllRoutes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalElement, setTotalElement] = useState(0);

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };
  useEffect(() => {
    getData();
  }, [pageSize]);

  const getData = async (sendPage) => {
    try {
      const response = await service.patch("/routes/all", {
        sendPage,
        pageSize,
      });
      setAllRoutes(response.data.routes);
      setTotalElement(response.data.size);
      setIsLoading(false);
    } catch (err) {
      navigate("/error");
    }
  };
  const styleHandler = {
    color: darkTheme ? "white" : "black",
    width: "300px",
    marginBottom: "10px",
  };
  const onSearch = async (value, _e, info) => {
    try {
      if (!value == "" || !info?.source == "clear") {
        const response = await service.patch("/routes/search", {
          value,
        });
        setAllRoutes(response.data);
      } else {
        getData();
      }
    } catch (err) {
      navigate("/error");
    }
  };

  const handlePagination = (e) => {
    setCurrentPage(e);
    getData(e);
    setIsLoading(true);
  };
  const style = {
    color: "white",
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
    <div className="route-container">
      <h1>All routes</h1>

      <Search
        placeholder="Search by username"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={styleHandler}
      />

      <div id="list-container">
        {allRoutes.map((eachRoute, index) => {
          return <RouteCard key={index} data={eachRoute} />;
        })}
      </div>
      <Divider />
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorText: "#FFFFFF",
          },
        }}
      >
        <Pagination
          defaultCurrent={currentPage}
          total={totalElement}
          onShowSizeChange={onShowSizeChange}
          onChange={handlePagination}
        />
      </ConfigProvider>
    </div>
  );
}

export default RoutesList;
