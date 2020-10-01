import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import Slider from "../product/slider/index";

const Product = (props) => {
  const [showModal, setShowModal] = useState(false);
  const amenities = props.room ? JSON.parse(props.room.amenities) : {};
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <Container className="pt-5 pb-5">
        <div className="mb-2">
          <h1>{props.room.title}</h1>
          <Modal
            animation={false}
            centered
            dialogClassName="modal-90w"
            show={showModal}
            onHide={() => setShowModal(false)}
          >
            <div
              className="position-absolute"
              style={{ zIndex: 2, top: "10px", right: "10px" }}
            >
              <Button
                block
                size="sm"
                className="border-0"
                style={{ backgroundColor: "#E92F58" }}
                onClick={() => setShowModal(false)}
              >
                <span>
                  <b>Close</b>
                </span>
              </Button>
            </div>
            <Modal.Body>
              <Slider room={props.room} />
            </Modal.Body>
          </Modal>
        </div>
        <Row className="pt-md-3 pb-md-5 d-none d-md-flex">
          <Col md="6" sm="12">
            <div
              style={{
                borderBottomLeftRadius: "10px",
                borderTopLeftRadius: "10px",
                overflow: "hidden",
              }}
            >
              <img
                style={{ width: "100%", objectFit: "cover" }}
                alt="image1"
                src={props.room.images[0].original}
              />
            </div>
          </Col>
          <Col md="6" sm="12">
            <div
              style={{
                borderBottomRightRadius: "10px",
                borderTopRightRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                className="position-absolute"
                style={{ zIndex: 2, bottom: "10px", right: "25px" }}
              >
                <Button
                  block
                  size="sm"
                  className="border-0"
                  style={{ backgroundColor: "#E92F58" }}
                  onClick={() => setShowModal(true)}
                >
                  <span>
                    <b>See all photos</b>
                  </span>
                </Button>
              </div>
              <img
                className="pb-1 pr-1"
                style={{ width: "50%" }}
                alt="image1"
                src={props.room.images[0].original}
              />
              <img
                className="pl-1 pb-1"
                style={{ width: "50%", paddingRight: "0px important" }}
                alt="image1"
                src={props.room.images[0].original}
              />
              <img
                className="pt-1 pr-1"
                style={{ width: "50%" }}
                alt="image1"
                src={props.room.images[0].original}
              />
              <img
                className="pt-1 pl-1"
                style={{ width: "50%", paddingRight: "0px important" }}
                alt="image1"
                src={props.room.images[0].original}
              />
            </div>
          </Col>
        </Row>
        <Row className="pt-md-3 pb-md-5 d-md-none">
          <Col>
            <Slider room={props.room} />
          </Col>
        </Row>
        <Row>
          <Col lg="9">
            <div>
              <div
                className="pb-4 mb-4"
                style={{ borderBottom: "1px solid #DDDDDD" }}
              >
                <h5>{props.room.description}</h5>
              </div>
              {amenities && (
                <div
                  className="pb-4 mb-4"
                  style={{ borderBottom: "1px solid #DDDDDD" }}
                >
                  <h4>Amenities</h4>
                  <ul>
                    {amenities && props.allAmenities.length > 0
                      ? Object.keys(amenities).map((key) => {
                          let tempValue;
                          tempValue = props.allAmenities.filter(
                            (a) => a.label === key
                          );
                          return amenities[key] === true &&
                            tempValue[0].icon ? (
                            <li className="d-block">
                              <span className="mr-3">
                                <i
                                  className={`fa  fa-lg ${
                                    tempValue ? tempValue[0].icon : " fa-check"
                                  }`}
                                  aria-hidden="true"
                                ></i>
                              </span>
                              {key}
                            </li>
                          ) : null;
                        })
                      : null}
                  </ul>
                </div>
              )}
            </div>
          </Col>
          <Col lg="3">
            <div
              style={{
                border: "1px solid rgb(221, 221, 221)",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
              }}
            >
              <div className="text-center mb-2" style={{ fontSize: "22px" }}>
                <span>
                  <b>${props.room.price}</b> / Month
                </span>
              </div>
              <div>
                <Button
                  block
                  className="border-0"
                  style={{ backgroundColor: "#E92F58" }}
                >
                  <span>
                    {" "}
                    <b>Book Now</b>{" "}
                  </span>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Product;
