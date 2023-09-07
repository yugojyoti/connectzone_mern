import React from "react";
import DefaultLayout from "../component/DefaultLayout";
import { Row, Col, Card, Image, Button, Form } from "react-bootstrap";
import {
  useFollowUserMutation,
  useGetAllUserQuery,
} from "../redux/slices/userApiSlice";
import Loader from "../component/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
const AllUsers = () => {
  const { data: alluser, isLoading } = useGetAllUserQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [followUser, { isLoading: loadingfollow }] = useFollowUserMutation();
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
                  placeholder="Serach User"
                  value={""}
                  className=""
                ></Form.Control>
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button className=" mt-2 mb-4">Search</Button>
              </div>
            </Form>

            {alluser.map((user) => {
              return (
                <>
                  {userInfo._id !== user._id && (
                    <Col sm={12} md={4} lg={3}>
                      <Card className="p-2 block-card rounded shadow m-2">
                        {user.profilePicUrl ? (
                          <Image src={user.profilePicUrl} />
                        ) : (
                          <div className=" bg-secondary text-light  profile-pic fw-bold ">
                            {user.username[0].toUpperCase()}
                          </div>
                        )}
                        <Link>{user.username}</Link>
                        <p> Since :{user.createdAt.slice(0, 10)}</p>
                        {user.followers.find((obj) => obj === userInfo._id) ? (
                          <div>
                            <Button
                              variant="secondary"
                              disabled
                              className="mx-1"
                            >
                              Following
                            </Button>
                            <Button variant="danger" disabled>
                              Unfollow
                            </Button>
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
                  )}
                </>
              );
            })}
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
};

export default AllUsers;
