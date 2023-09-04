import React from "react";
import { Spinner, Row } from "react-bootstrap";
const Loader = () => {
  return (
    <div className="container">
      <Row className="justify-content-center mt-5">
        <Spinner />
      </Row>
    </div>
  );
};

export default Loader;
