import React, { useState } from "react";
import { Button, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { BsHeart, BsChat, BsHeartFill } from "react-icons/bs";
import "../css/post.css";
import {
  useAddcommentMutation,
  useLikeMutation,
} from "../redux/slices/postSlice";
import { useSelector } from "react-redux";
import { message } from "antd";
import Loader from "./Loader";
import { useGetAllUserQuery } from "../redux/slices/userApiSlice";
const Post = ({ posts }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [likePostApi, { isLoading }] = useLikeMutation();
  const [comment, setComment] = useState("");
  const [modalpost, setModalPost] = useState();
  const [addCommentApi, { isLoading: loadingComment }] =
    useAddcommentMutation();
  const { data: allUser } = useGetAllUserQuery();

  const handleLike = async (postId) => {
    const data = { userId: userInfo._id, postId: postId };

    try {
      const res = await likePostApi(data).unwrap();
      message.success(res.message);
    } catch (error) {
      message.error(error?.data?.message || error.error);
    }
  };
  const showLike = (post) => {
    const liked = post.likes.find(
      (like) => like.user.toString() === userInfo._id
    );
    return liked ? (
      <BsHeartFill style={{ color: "red" }}></BsHeartFill>
    ) : (
      <BsHeart></BsHeart>
    );
  };
  const handleClose = () => {
    setComment("");
    setShow(false);
  };
  const handleShow = (post) => {
    setShow(true);
    setModalPost(post);
  };
  const handleAddComment = async () => {
    setShow(false);
    const dataComment = {
      comment: comment,
      userId: userInfo._id,
      postId: modalpost._id,
    };
    try {
      const res = await addCommentApi(dataComment).unwrap();
      message.success(res.message);
    } catch (error) {
      message.error(error?.data?.message || error.error);
    }
    setComment("");
  };

  return (
    <>
      {posts.length === 0 ? (
        <h3 className="text-center">No post Available</h3>
      ) : (
        <div className="container-fluid bg-secondary-subtle">
          <Row className="justify-content-center">
            <Col sm={10} md={8} lg={6}>
              {posts.map((post) => (
                <Card
                  className="px-2 my-2 border-secondary-subtle rounded shadow"
                  key={post._id}
                >
                  <div className="container my-2">
                    <Row className="align-items-center">
                      <Col className="col-2 ">
                        {post.user.profilePicUrl ? (
                          <Image src={post.user.profilePicUrl} />
                        ) : (
                          <div className=" bg-secondary text-light  profile-pic fw-bold ">
                            {post.user.username[0].toUpperCase()}
                          </div>
                        )}
                      </Col>
                      <Col className="col-6 ml-1 text-primary fst-italic fw-light">
                        <h6 className="">{post.user.username}</h6>
                      </Col>
                      <Col className="col-4 ">
                        <p>{post.createdAt.slice(0, 10)}</p>
                      </Col>
                    </Row>
                  </div>

                  <Image src={post.image} />
                  <Card.Body>
                    <Card.Text className="mx-2">{post.description}</Card.Text>
                    <div className="mt-2 d-flex">
                      <div className="mr-2">
                        <button
                          className="btn"
                          onClick={() => {
                            handleLike(post._id);
                          }}
                        >
                          {" "}
                          {/* {isLoading ? <Loader /> : showLike(post)} */}
                          {showLike(post)}
                        </button>
                        <strong> {post.likes.length}</strong>
                      </div>
                      <div className="mr-2">
                        <Button
                          variant="light"
                          onClick={() => {
                            handleShow(post);
                          }}
                        >
                          <BsChat></BsChat>
                        </Button>
                        {show && (
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Add Comment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <p>{modalpost.description}</p>
                              <Image
                                src={modalpost.image}
                                height={80}
                                width={60}
                              />
                              <Form>
                                <Form.Group>
                                  <Form.Label>Comment</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  ></Form.Control>
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={handleAddComment}
                              >
                                Add Comment
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        )}

                        <strong> {post.comments.length}</strong>
                      </div>
                    </div>
                    <hr />
                    {post.comments.length >= 0 && allUser ? (
                      post.comments.map((comment) => {
                        const userComment = allUser.filter(
                          (user) => user._id === comment.user
                        );

                        return (
                          <div
                            className="mt-2 bg-secondary-subtle"
                            key={comment._id}
                          >
                            <div className="row">
                              <div className="col-2">
                                {userComment[0].profilePicUrl ? (
                                  <Image src={userComment[0].profilePicUrl} />
                                ) : (
                                  <div className=" bg-secondary text-light  profile-pic fw-bold ">
                                    {userComment[0].username[0].toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <div className="col-10">
                                <p>
                                  <strong>{userComment[0].username} : </strong>{" "}
                                  {comment.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <h6> No comments</h6>
                    )}
                    {post.comments.length === 0 && <h6> No comments</h6>}
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Post;
