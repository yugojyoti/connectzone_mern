import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Container,
  Button,
  Form,
  ToastContainer,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/slices/userApiSlice";
import Loader from "../component/Loader";
import { toast } from "react-toastify";
import { setCredential } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    try {
      const res = await login(user).unwrap();
      dispatch(setCredential({ ...res.user }));

      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" container-fluid bg-primary-subtle">
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
                    <Button type="submit" className="mt-3 text-center">
                      {" "}
                      Register
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <Link to="/register">
                      New User? Click here to Register{" "}
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

export default LoginPage;
