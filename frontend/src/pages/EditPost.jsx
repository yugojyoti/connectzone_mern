import React, { useEffect, useState } from "react";
import DefaultLayout from "../component/DefaultLayout";
import { Navigate, useParams } from "react-router-dom";
import { useGetPostQuery } from "../redux/slices/postSlice";
import Loader from "../component/Loader";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { useEditPostMutation } from "../redux/slices/postSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditPost = () => {
  const [description, setDescription] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: post, isLoading } = useGetPostQuery(postId);
  const [editPostApi, { isLoading: loadingEdit }] = useEditPostMutation();
  useEffect(() => {
    if (post) {
      setDescription(post.description);
    }
  }, [post]);

  const editPost = async (e) => {
    e.preventDefault();
    const data = {
      postId: postId,
      description,
    };
    try {
      const res = await editPostApi(data).unwrap();
      message.success(res.message);
      navigate(`/profile/${userInfo._id}`);
    } catch (error) {
      message.error(error?.data?.message || error.error);
    }
  };

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loader />
      ) : post.user === userInfo._id ? (
        <div className="container-fluid bg-secondary-subtle">
          <Row className="justify-content-center">
            <Col sm={10} md={8} lg={6}>
              <Card className="p-3 rounded shadow border-dark-subtle">
                <h2 className="text-center">Add Post</h2>

                <Form onSubmit={editPost}>
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

                  <div className="d-flex justify-content-center">
                    <Image src={post.image} height={200} width={200} />
                  </div>
                  {loadingEdit ? (
                    <Loader />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center my-3 ">
                      <Button type="submit"> Edit Post</Button>
                    </div>
                  )}
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <Navigate to={`/profile/${userInfo._id}`} replace />
      )}
    </DefaultLayout>
  );
};

export default EditPost;
