import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div>
      <h3>Profile</h3>
      <h4>Edit motorbike details </h4>
      <Link to={"/editMoto"}>
        <button>Ir a editar</button>
      </Link>
    </div>
  );
}

export default Profile;
