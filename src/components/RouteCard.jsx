import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RouteMap from "./RouteMap";
import { Card } from "antd";

const { Meta } = Card;

function RouteCard(props) {
  const { destiny, origin, user, _id } = props.data;

  return (
    <div id="route-Card">
      <Link to={`/routeDetails/${_id}`}>
        <div className="user-info">
          <h3>{user.username}</h3>
          <div className="img-container-list">
            <img src={user.userPicture} alt="motoimg" />
          </div>
        </div>
        <div className="map-container">
          <RouteMap origin={origin} destiny={destiny} />
        </div>
      </Link>
    </div>
  );
}

export default RouteCard;
