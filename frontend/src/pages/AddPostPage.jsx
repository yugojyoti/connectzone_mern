import React, { useState } from "react";
import DefaultLayout from "../component/DefaultLayout";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAddPostMutation } from "../redux/slices/postSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Loader from "./../component/Loader";
const AddPostPage = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [addPostApi, { isLoading }] = useAddPostMutation();
  const navigate = useNavigate();

  const fileInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const addPost = async (e) => {
    e.preventDefault();
    const post = {
      description,
      image,
      user: userInfo._id,
      likes: [],
      comments: [],
    };
    try {
      const res = await addPostApi(post).unwrap();
      message.success(res.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message || error.error);
    }
  };

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <Row className="justify-content-center">
            <Col sm={10} md={8} lg={6}>
              <Card className="p-3 rounded shadow border-dark-subtle">
                <h2 className="text-center">Add Post</h2>

                <Form encType="multipart/form-data" onSubmit={addPost}>
                  <Form.Group controlId="description" className="my-3">
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter Description"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="upload" className="my-3">
                    <Form.Label className="fw-bold">
                      Choose an image to upload{" "}
                    </Form.Label>

                    <Form.Control
                      type="file"
                      label="Upload Image"
                      onChange={fileInput}
                    ></Form.Control>
                  </Form.Group>
                  {image !== "" && (
                    <div className="d-flex justify-content-center">
                      <Image src={image} height={200} width={200} />
                    </div>
                  )}

                  <div className="d-flex justify-content-center align-items-center my-3 ">
                    <Button type="submit"> Upload</Button>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
};

export default AddPostPage;
