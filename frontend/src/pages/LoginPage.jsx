import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Container,
  Button,
  Form,
  ToastContainer,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/slices/userApiSlice";
import Loader from "../component/Loader";

import { setCredential } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import logo from "../logo.png";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const handleGuest = async () => {
    const user = {
      username: "Guest",
      password: "password",
    };
    console.log("user", user);
    try {
      const res = await login(user).unwrap();
      dispatch(setCredential({ ...res.user }));
      message.success(res.message);
      navigate("/");
    } catch (error) {
      message.error(error?.data?.message || error.error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    try {
      const res = await login(user).unwrap();
      dispatch(setCredential({ ...res.user }));
      message.success(res.message);
      navigate("/");
    } catch (error) {
      message.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" container-fluid bg-secondary-subtle">
          <Row className="justify-content-center align-items-center vh-100">
            <Col sm={8} md={6} lg={5}>
              <Card className="card-block p-3 shadow rounded border-dark-subtle">
                <h1 className="text-center"> Login Form</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="username" className="my-2">
                    <Form.Label className="fw-bold">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      name="username"
                      value={username}
                      className="form-control"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="password" className="my-2">
                    <Form.Label className="fw-bold"> Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      value={password}
                      className="form-control"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <div className="d-flex justify-content-center ">
                    <Button type="submit" className="my-3 text-center">
                      {" "}
                      Login
                    </Button>
                  </div>
                </Form>

                <div className="d-flex justify-content-center">
                  <Button
                    onClick={handleGuest}
                    className="btn btn-dark"
                    type="button"
                  >
                    {" "}
                    Login as a Guest
                  </Button>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Link to="/register">New User? Click here to Register </Link>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default LoginPage;
