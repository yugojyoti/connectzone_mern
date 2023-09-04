import React from "react";
import DefaultLayout from "../component/DefaultLayout";
import { Row, Col, Card, Form } from "react-bootstrap";
const AddPostPage = () => {
  return (
    <DefaultLayout>
      <div className="container-fluid">
        <Row className="justify-content-center">
          <Col sm={10} md={7} lg={5}>
            <Card className="p-3 rounded shadow border-dark-subtle">
              <h1 className="text-center">Add Post</h1>
              <Form>
                <Form.Group controlId="description">
                  <Form.Label className="fw-bold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Enter Description"
                  ></Form.Control>
                </Form.Group>
                <Form.Group></Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default AddPostPage;
