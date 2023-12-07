import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RouteMap from "./RouteMap";
import { Avatar, Card } from "antd";

const { Meta } = Card;

function RouteCard(props) {
  const { destiny, origin, user, _id } = props.data;
  const { username, motoMake, motoModel } = user;

  return (
    <div>
      <Link to={`/routeDetails/${_id}`} style={{ textDecoration: "none" }}>
        <Card
          style={{
            width: 400,
          }}
          cover={<RouteMap origin={origin} destiny={destiny} />}
        >
          <Meta
            avatar={<Avatar src={user.userPicture} />}
            title={`${username}`}
          />
          <Meta
            avatar={<Avatar src={user.motoPicture} />}
            title={`${motoMake} ${motoModel}`}
          />
        </Card>
      </Link>
    </div>
  );
}

export default RouteCard;
