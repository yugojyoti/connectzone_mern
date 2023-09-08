import React, { useEffect, useState } from "react";
import DefaultLayout from "../component/DefaultLayout";
import { useSelector } from "react-redux";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetUserQuery } from "../redux/slices/userApiSlice";
import Loader from "../component/Loader";
import {
  useDeletePostMutation,
  useGetAllPostQuery,
} from "../redux/slices/postSlice";
import { BsHeart, BsChat } from "react-icons/bs";
import { message } from "antd";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const [myPost, setMyPost] = useState([]);
  const { data: user, isLoading } = useGetUserQuery(userId);
  const { data: posts, isLoading: loadinPost } = useGetAllPostQuery();
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation();

  useEffect(() => {
    if (user && posts) {
      const userPosts = posts.filter((post) => {
        return post.user._id === user._id;
      });
      setMyPost(userPosts);
    }
  }, [posts, user]);

  const handleDeletePost = async (postId) => {
    try {
      const res = await deletePost({ postId }).unwrap();
      message.success(res.message);
    } catch (error) {
      message.error(error?.data?.message || error.error);
    }
  };
  return (
    <DefaultLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="container bg-secondary-subtle">
            <Row className="justify-content-center">
              <Col lg={6} md={8} sm={12}>
                <Card className="p-2 my-2 block-card rounded shadow border-primary-subtle">
                  <div className="">
                    <Row
                      className=" 
                   align-items-center"
                    >
                      {" "}
                      <Col>
                        {user.profilePicUrl ? (
                          <Image
                            src={user.profilePicUrl}
                            height={60}
                            width={60}
                            className="rounded-circle "
                          />
                        ) : (
                          <div className=" bg-secondary text-light  profile-pic fw-bold ">
                            {user.username[0].toUpperCase()}
                          </div>
                        )}
                      </Col>
                      <Col>
                        <div className="">
                          <p className="fw-bold">{user.username}</p>
                          <p>{user.createdAt.slice(0, 10)}</p>
                          {user._id === userInfo._id ? (
                            <Link to={`/editProfile`}>
                              {" "}
                              <Button className="text-white">
                                {" "}
                                Edit Profile{" "}
                              </Button>{" "}
                            </Link>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <p className="my-2">
                      {" "}
                      Bio:
                      {user.bio ? user.bio : "  "}
                    </p>
                    <Row>
                      <Col className="d-flex justify-content-between">
                        {" "}
                        <Button variant="info" className="text-light">
                          Followers : {user.followers.length}
                        </Button>
                      </Col>
                      <Col>
                        {" "}
                        <Button variant="info" className="text-light">
                          Following : {user.following.length}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
            <hr />
            <Row>
              {myPost &&
                myPost.map((post) => (
                  <Col sm={12} md={4} lg={3} key={post._id}>
                    <Card className="p-2 block-card rounded shadow m-2 border-dark-subtle">
                      <Row>
                        <Image src={post.image} height={80} width={80} />
                      </Row>
                      <Row>
                        <p>{post.description}</p>
                      </Row>
                      <Row className="my-2 d-flex justify-content-center">
                        <Col>
                          <BsHeart></BsHeart>
                          <span className="mx-2">{post.likes.length}</span>
                        </Col>
                        <Col>
                          <BsChat></BsChat>
                          <span className="mx-2">{post.comments.length}</span>
                        </Col>
                      </Row>
                      {post.user._id === userInfo._id && (
                        <Row className="my-2 d-flex justify-content-center">
                          <Col>
                            <Link to={`/editpost/${post._id}`}>
                              <Button> Edit</Button>
                            </Link>
                          </Col>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() => {
                                handleDeletePost(post._id);
                              }}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default ProfilePage;
