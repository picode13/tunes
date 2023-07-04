import React, { useState } from "react";
import "../css/App.css";
import { connect } from "react-redux";

import { Card, Form, Icon, Input, Button, message } from "antd";
import Fetch from "../components/Fetch";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateStatusEmail, setValidateStatusEmail] = useState("success");
  const [validateStatusPassword, setValidateStatusPassword] = useState(
    "success"
  );
  const [helpEmail, setHelpEmail] = useState("");
  const [helpPassword, setHelpPassword] = useState("");
  const loginApiCall = () => {
    if (!helpEmail && !helpPassword && email && password) {
      const formData = new FormData();
      formData.append("password", password);
      formData.append("email", email);
      props.fetch(
        `/onLogin`,
        "POST",
        formData,
        async (response) => {
          if (response.success) {
            await props.login_auth();
            props.history.push("/dashboard");
          } else {
            message.error(response.message);
          }
        },
        (err) => {
          console.log(err)
          if(err.status===401){
            props.history.push("/loginpage")
          }
        }
      );
    } else {
      if (!email && !helpEmail) {
        setValidateStatusEmail("error");
        setHelpEmail("Email is required");
      }
      if (!password && !helpPassword) {
        setValidateStatusPassword("error");
        setHelpPassword("Password is required");
      }
    }
  };

  const changeValues = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        setValidateStatusEmail("success");
        setHelpEmail("");
        break;
      case "password":
        if (e.target.value.length <= 16) {
          setPassword(e.target.value);
          setValidateStatusPassword("success");
          setHelpPassword("");
        } else {
          setValidateStatusPassword("error");
          setHelpPassword("Password possess maximum 16 characters");
        }
        break;
      default:
        break;
    }
  };

  const saveValues = (e) => {
    switch (e.target.id) {
      case "email":
        if (
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
            e.target.value
          )
        ) {
          setEmail(e.target.value);
          setValidateStatusEmail("success");
          setHelpEmail("");
        } else {
          setValidateStatusEmail("error");
          setHelpEmail("Enter a valid Email");
        }
        break;
      case "password":
        if (e.target.value.length >= 8) {
          if (/^[a-zA-Z0-9]*$/.test(e.target.value)) {
            setValidateStatusPassword("success");
            setHelpPassword("");
          } else {
            setValidateStatusPassword("error");
            setHelpPassword("Password must be alphanumeric");
          }
        } else {
          setValidateStatusPassword("error");
          setHelpPassword("Password possess mininum 8 characters");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="row" id="login">
      <Card style={{ minWidth: "300px" }}>
        <Form>
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <img
              alt="music-logo"
              style={{ width: "40px", height: "40px" }}
              src={`${process.env.PUBLIC_URL}/music_logo.png`}
            />
            <span style={{ fontSize: "20px" }}>Tunes</span>
          </div>
          <Form.Item validateStatus={validateStatusEmail} help={helpEmail}>
            <Input
              size="large" autoFocus
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              value={email}
              onChange={(e) => changeValues(e)}
              onBlur={(e) => saveValues(e)}
              id="email"
            />
          </Form.Item>
          <Form.Item
            validateStatus={validateStatusPassword}
            help={helpPassword}
          >
            <Input.Password
              size="large"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              onPressEnter={() => loginApiCall()}
              onChange={(e) => changeValues(e)}
              placeholder="Password"
              value={password}
              onBlur={(e) => saveValues(e)}
              id="password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => loginApiCall()}
              className="login-form-button"
            >
              Log in
            </Button>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span>or</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <a href={`${process.env.REACT_APP_API_URL}/login/auth/facebook`}>Login with Facebook</a> */}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a href="/Register">Not Register? Create an account</a>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    loading_action: (value) => {
      dispatch({
        type: "LOADING_ACTION",
        loading: value,
      });
    },
    login_auth: () => {
      dispatch({
        type: "LOGIN_AUTH",
        can_proceed: true,
      });
    },
    fetch:(appendUrl,type,payload,success,failure)=>
    dispatch(Fetch(appendUrl,type,payload,success,failure))
  };
};
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default connect(null, mapDispatchToProps)(WrappedNormalLoginForm);
