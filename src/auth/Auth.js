import React, { useCallback, useState } from "react";
import "./auth.css";
import User from "./User";
import { useNavigate } from "react-router-dom";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialGithub,
} from "reactjs-social-login";

import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

// dotenv.config();

const REDIRECT_URI = "http://localhost:3000/account/login";

const Auth = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);
  const history = useNavigate()

  const githubAppId = "d365710fdc202602edd0";
  const githubAppSecret = "c2fa4504b2dc2754d608f54fd601eeb2b0dff762";
  const facebookAppId = "7588365514523860";
  const googleAppId =
    "658146248429-lug64bn6glq5fuot8suue6lmrsui3ggg.apps.googleusercontent.com";

  // const facebookAppId = process.env.REACT_APP_FB_APP_ID;
  // const googleAppId = process.env.REACT_APP_GG_APP_ID;
  // const githubAppId = process.env.REACT_APP_GITHUB_APP_ID;
  // const githubAppSecret = process.env.REACT_APP_GITHUB_APP_SECRET;

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {
    setProvider("");
    setProfile(null);
  }, []);
  

  return (
    <div className="auth-container">
      {profile && profile && (
        <User provider={profile} profile={profile} onLogout={onLogout} />
      )}
      <div className={`Auth ${provider && profile ? "hide" : ""}`}>
        <h1 className="title">ReactJS Social Login </h1>
        <LoginSocialFacebook
          appId={facebookAppId || ""}
          fieldsProfile={
            "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
          }
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          redirect_uri={REDIRECT_URI}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
            // history("/");
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <FacebookLoginButton className="login-button" />
        </LoginSocialFacebook>
        <LoginSocialGoogle
          client_id={googleAppId || ""}
          onLoginStart={onLoginStart}
          redirect_uri={REDIRECT_URI}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
            history("/");
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GoogleLoginButton className="login-button" />
        </LoginSocialGoogle>
        <LoginSocialGithub
          client_id={githubAppId || ""}
          client_secret={githubAppSecret || ""}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
            history("/");
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GithubLoginButton className="login-button" />
        </LoginSocialGithub>
      </div>
    </div>
  );
};
export default Auth;

//facebook-bac9a898cff1a5c939b0fd205f3854e0
