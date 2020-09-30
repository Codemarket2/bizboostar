import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Wifi, Anchor, Camera, Bell, Clock } from "react-feather";

const Product = (props) => (
  <div style={{ backgroundColor: "#FFFFFF" }}>
    <Container className="pt-5 pb-5">
      <div className="mb-2">
        <h1>Enjoy this beautiful Tent number two</h1>
      </div>
      <Row className="pt-md-3 pb-md-5">
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
              src="https://a0.muscache.com/im/pictures/9355582d-a014-43da-8b8a-ffff99467079.jpg?im_w=960"
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
            <img
              className="pb-1 pr-1"
              style={{ width: "50%" }}
              alt="image1"
              src="https://a0.muscache.com/im/pictures/9355582d-a014-43da-8b8a-ffff99467079.jpg?im_w=960"
            />
            <img
              className="pl-1 pb-1"
              style={{ width: "50%", paddingRight: "0px important" }}
              alt="image1"
              src="https://a0.muscache.com/im/pictures/9355582d-a014-43da-8b8a-ffff99467079.jpg?im_w=960"
            />
            <img
              className="pt-1 pr-1"
              style={{ width: "50%" }}
              alt="image1"
              src="https://a0.muscache.com/im/pictures/9355582d-a014-43da-8b8a-ffff99467079.jpg?im_w=960"
            />
            <img
              className="pt-1 pl-1"
              style={{ width: "50%", paddingRight: "0px important" }}
              alt="image1"
              src="https://a0.muscache.com/im/pictures/9355582d-a014-43da-8b8a-ffff99467079.jpg?im_w=960"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="9">
          <div>
            <div
              className="pb-4 mb-4"
              style={{ borderBottom: "1px solid #DDDDDD" }}
            >
              <h3>
                Private room in tent hosted by Amanda Private room in tent
                hosted by AAA美国当代艺术聯盟會長Amanda
              </h3>
            </div>
            <div
              className="pb-4 mb-4"
              style={{ borderBottom: "1px solid #DDDDDD" }}
            >
              <h4>Amenities</h4>
              <ul>
                <li className="d-block">
                  <Wifi className="mr-3" />
                  Wifi
                </li>
                <li className="d-block">
                  {" "}
                  <Bell className="mr-3" />
                  Bell
                </li>
                <li className="d-block">
                  {" "}
                  <Camera className="mr-3" /> Camera
                </li>
                <li className="d-block">
                  {" "}
                  <Clock className="mr-3" /> Clock
                </li>
              </ul>
            </div>
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
                <b>$3000</b> / Month
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

export default Product;
