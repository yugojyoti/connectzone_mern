import React, { useEffect, useState } from "react";
import DefaultLayout from "../component/DefaultLayout";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import {
  useEditProfileMutation,
  useGetUserQuery,
} from "../redux/slices/userApiSlice";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetUserQuery(userInfo._id);
  const [editProfileApi, { isLoading: loadingEdit }] = useEditProfileMutation();

  useEffect(() => {
    if (user) {
      setImage(user.profilePicUrl);
      setBio(user.bio);
      setEmail(user.email);
      setName(user.username);
      setIsPrivate(user.privateAccount);
    }
  }, [user]);
  const fileInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const editProfile = async (e) => {
    e.preventDefault();
    const editData = {
      userId: userInfo._id,
      username: name,
      email: email,
      bio: bio,
      isPrivate: isPrivate,
      image: image,
    };
    try {
      const res = await editProfileApi(editData).unwrap();
      message.success(res.message);
      navigate(`/profile/${userInfo._id}`);
    } catch (error) {
      message.error(error?.data?.message || error.error);
    }
  };
  return (
    <DefaultLayout>
      <div className="container-fluid bg-secondary-subtle">
        <Row className="justify-content-center">
          <Col sm={10} md={8} lg={6}>
            <Card className="p-3 rounded shadow border-dark-subtle">
              <h2 className="text-center">Edit Profile</h2>

              <Form encType="multipart/form-data" onSubmit={editProfile}>
                <Form.Group controlId="name" className="my-3">
                  <Form.Label className="fw-bold">Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="my-3">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Name"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="bio" className="my-3">
                  <Form.Label className="fw-bold">Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Enter Bio"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="private" className="my-3">
                  <Form.Label className="fw-bold"> Private Account</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label=" Private Account"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(!isPrivate)}
                  ></Form.Check>
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
                  <Button type="submit"> Edit Profile</Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default EditProfile;
