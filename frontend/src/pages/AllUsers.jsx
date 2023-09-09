import React, { useEffect, useState } from "react";
import DefaultLayout from "../component/DefaultLayout";
import { Row, Col, Card, Image, Button, Form } from "react-bootstrap";
import {
  useFollowUserMutation,
  useGetAllUserQuery,
  useUnFollowUserMutation,
} from "../redux/slices/userApiSlice";
import Loader from "../component/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
const AllUsers = () => {
  const [search, setSerach] = useState("");
  const [userList, setUserList] = useState([]);
  const { data: alluser, isLoading } = useGetAllUserQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [followUser, { isLoading: loadingfollow }] = useFollowUserMutation();
  const [unfollowUser] = useUnFollowUserMutation();

  const handleUserFollow = async (recieverUserId) => {
    const data = {
      currentUserId: userInfo._id,
      recieverUserId,
    };
    try {
      const res = await followUser(data).unwrap();
      message.success(res.message);
    } catch (error) {
      message.error(error.error);
    }
  };
  const handleUserUnfollow = async (recieverUserId) => {
    const data = {
      currentUserId: userInfo._id,
      recieverUserId,
    };
    try {
      const res = await unfollowUser(data).unwrap();
      message.success(res.message);
    } catch (error) {
      message.error(error.error);
    }
  };

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" container bg-secondary-subtle">
          <Row className="content-justify center my-3">
            <Form>
              <Form.Group className="">
                <Form.Control
                  type="text"
                  placeholder="Search User"
                  value={search}
                  className=""
                  onChange={(e) => setSerach(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>

            {alluser
              .filter(
                (user) =>
                  user._id !== userInfo._id &&
                  user.username.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => {
                return (
                  <Col sm={12} md={4} lg={3} key={user._id}>
                    <Card className="p-3 block-card rounded shadow m-2 border-dark-subtle">
                      <Row>
                        {" "}
                        {user.profilePicUrl ? (
                          <Image src={user.profilePicUrl} />
                        ) : (
                          <div className="pl-3 bg-secondary text-light  profile-pic fw-bold ">
                            {user.username[0].toUpperCase()}
                          </div>
                        )}
                      </Row>
                      <Row>
                        <Link to={`/profile/${user._id}`}>{user.username}</Link>
                      </Row>
                      <Row>
                        <p> Since :{user.createdAt.slice(0, 10)}</p>
                      </Row>

                      {user.followers.find((obj) => obj === userInfo._id) ? (
                        <div className="btn-group">
                          <Col>
                            {" "}
                            <Button
                              variant="success"
                              disabled
                              className="mx-2 btn-sm"
                            >
                              Following
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              variant="danger"
                              className="mx-2 btn-sm"
                              onClick={() => {
                                handleUserUnfollow(user._id);
                              }}
                            >
                              Unfollow
                            </Button>
                          </Col>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            handleUserFollow(user._id);
                          }}
                        >
                          Follow
                        </Button>
                      )}
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
};

export default AllUsers;
