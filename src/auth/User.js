import React, { memo } from "react";
import './auth.css'

const User = memo(({ provider, profile, onLogout }) => {
  const avatar =
    profile?.avatar ||
    profile?.profile_image_url ||
    profile?.avatar_url ||
    profile?.picture ||
    profile?.picture?.data?.url ||
    profile?.profile_image_url_https;

  const providerName =
    typeof provider === "string" ? provider.toUpperCase() : "";

  return (
    <div className="card">
      <div className="avt">
        <img alt="141" src={avatar} />
      </div>

      <h3 className="provider">{providerName}</h3>

      <div className="content">
        <div className="data">
          {Object.entries(profile).map(([key, value]) => (
            <div className="field" key={key}>
              <div className="label">{key}: </div>
              <div className="value">{JSON.stringify(value)}</div>
            </div>
          ))}
        </div>
        <button className="btnLogout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
});

export default User;
