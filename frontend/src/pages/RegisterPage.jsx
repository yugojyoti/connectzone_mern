import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Container,
  Card,
  ToastContainer,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../redux/slices/userApiSlice";
import Loader from "../component/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredential } from "../redux/slices/authSlice";
import { message } from "antd";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };
    try {
      const res = await register(user).unwrap();
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
        <div className="container-fluid bg-secondary-subtle ">
          <Row className="justify-content-center align-items-center vh-100">
            <Col sm={8} md={6} lg={5}>
              <Card className="p-3 card-block border-dark-subtle shadow rounded ">
                <h1 className="text-center">Register Form</h1>
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
                  <Form.Group controlId="email" className="my-2">
                    <Form.Label className="fw-bold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={email}
                      className="form-control"
                      onChange={(e) => {
                        setEmail(e.target.value);
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
                    <Button type="submit" className="mt-3 text-center">
                      {" "}
                      Register
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <Link to="/login">
                      Already Registed? Click here to Login{" "}
                    </Link>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
