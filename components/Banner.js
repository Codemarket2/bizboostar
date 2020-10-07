import { useQuery, gql } from "@apollo/client";
import React from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import Link from "next/link";
import FormEmbed from "../src/app/components/formBuilder/FormEmbed";

const GET_ALL_ROOMS = gql`
  query GetAllRooms {
    getAllRooms {
      _id
      title
      slug
      images {
        original
        thumbnail
      }
    }
  }
`;

const Banner = () => {
  const { data, loading, error } = useQuery(GET_ALL_ROOMS);
  let fourRooms = [];
  if (data) {
    fourRooms = data.getAllRooms.filter(
      (r) =>
        r.slug === "podcast-studio" ||
        r.slug === "vr-studio" ||
        r.slug === "office-101" ||
        r.slug === "dedicated-desk-a-on-1st-floor"
    );
  }
  return (
    <section
      className="banner-one"
      id="banner"
      style={{
        backgroundImage: `url(/assets/images/background/banner-bg-1-1.png)`,
      }}
    >
      {/* <img src="/assets/images/shapes/camera3.png" alt="" className="banner-one__shape-1" /> */}
      <img
        src="/assets/images/shapes/vr.png"
        alt=""
        className="banner-one__shape-vr"
      />

      <img
        src="/assets/images/shapes/MOVIES.png"
        alt=""
        className="banner-one__shape-4"
      />
      <img
        src="/assets/images/shapes/banner-shapes-1-5.png"
        alt=""
        className="banner-one__shape-5"
      />
      <img
        src="/assets/images/shapes/camera3.png"
        alt=""
        className="banner-one__shape-6"
      />
      <img
        src="/assets/images/shapes/banner-shapes-1-7.png"
        alt=""
        className="banner-one__shape-7"
      />

      <div className="container" style={{ paddingTop: "200px" }}>
        <img
          src="/assets/images/shapes/camera.png"
          alt=""
          className="banner-one__shape-moc-camera"
        />
        <img
          src="/assets/images/shapes/MICROPHONE.png"
          alt=""
          className="banner-one__shape-moc-microphone"
        />
        <img
          src="/assets/images/mocs/room.jpg"
          alt=""
          className="banner-one__moc"
        />
        <div className="row">
          <div className="col-lg-6">
            <div className="banner-one__content">
              {/* <p className="banner-one__tag-line">
                Community<a href="#">Hub for Creative Innovators</a>
              </p> */}

              <h3>
                Offices & Digital Studios <br />
              </h3>

              <p>
                Whether you are a solopreneur or a small business owner <br />{" "}
                or a large corporation we have a perfect space for you.
              </p>
              <a
                href="#contact"
                data-target="#contact"
                className="thm-btn banner-one__btn scroll-to-target"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="homepage-offices-scroll mt-lg-0 mt-xl-0 mt-4"
              style={{
                // maxHeight: "380px !important",
                // overflowY: "scroll",
                // overflowX: "hidden",
                overflow: "hidden",
                backgroundColor: "white",
                border: "1px solid rgb(221, 221, 221)",
                borderRadius: "2px",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
              }}
            >
              {fourRooms &&
                fourRooms.map((r) => {
                  const roomImage = r.images.filter(
                    (i) =>
                      i.original.split(".").pop().toLowerCase() === "jpg" ||
                      i.original.split(".").pop().toLowerCase() === "jpeg" ||
                      i.original.split(".").pop().toLowerCase() === "png" ||
                      i.original.split(".").pop().toLowerCase() === "gif"
                  );
                  return (
                    <div
                      style={{ width: "50%" }}
                      className="d-inline-block position-relative"
                      key={r._id}
                    >
                      <img
                        style={{ width: "100%" }}
                        className="p-1"
                        src={roomImage[0].original}
                        alt={r.title}
                      />
                      <div
                        className="position-absolute"
                        style={{ zIndex: 2, bottom: "8px", left: "7px" }}
                      >
                        <Link href={`/offices/${r.slug}`}>
                          <Button
                            block
                            size="sm"
                            className="border-0"
                            style={{ backgroundColor: "#E92F58" }}
                          >
                            <span className="d-inline-block">
                              <b>{r.title}</b>
                            </span>
                            <span className="d-inline-block ml-1">
                              <img
                                src={`/assets/images/shapes/${
                                  r.slug === "vr-studio"
                                    ? "vr.png"
                                    : r.slug === "podcast-studio"
                                    ? "microphone.png"
                                    : "camera.png"
                                }`}
                                alt="r.slug"
                                style={{ width: "23px" }}
                              />
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              {/* <Table bordered hover size="sm">
                <tbody>
                  {data && data.getAllRooms !== null
                    ? data.getAllRooms.map((r, i) => {
                        const roomImage = r.images.filter(
                          (i) =>
                            i.original.split(".").pop().toLowerCase() ===
                              "jpg" ||
                            i.original.split(".").pop().toLowerCase() ===
                              "jpeg" ||
                            i.original.split(".").pop().toLowerCase() ===
                              "png" ||
                            i.original.split(".").pop().toLowerCase() === "gif"
                        );
                        return (
                          <tr key={r}>
                            <td>
                              <div
                                className="text-center"
                                style={{
                                  zIndex: 2,
                                  bottom: "10px",
                                  right: "25px",
                                }}
                              >
                                {roomImage[0] && (
                                  <img
                                    //   className="d-inline"
                                    style={{ width: "265px" }}
                                    src={roomImage[0].thumbnail}
                                    alt={r.title}
                                  />
                                )}
                                <Button
                                  block
                                  size="sm"
                                  className="border-0"
                                  style={{ backgroundColor: "#E92F58" }}
                                  // onClick={() => setShowModal(true)}
                                >
                                  <span>
                                    <b>{r.title}</b>
                                  </span>
                                </Button>
                              </div>
                            </td>
                            <td>
                              <div className="text-center">
                                {roomImage[0] && (
                                  <img
                                    //   className="d-inline"
                                    style={{ width: "265px" }}
                                    src={roomImage[0].thumbnail}
                                    alt={r.title}
                                  />
                                )}
                                <Button
                                  block
                                  size="sm"
                                  className="border-0"
                                  style={{ backgroundColor: "#E92F58" }}
                                >
                                  <span>
                                    <b>See all photos</b>
                                  </span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
             */}
            </div>
            <div className="banner-one__content mt-3">
              <div>
                <input
                  className="homepage-email-input banner-one__tag-line border-0"
                  placeholder="Enter Your Email"
                  type="email"
                />
                <button className="homepage-email-button p-1">
                  Get FREE 1 Day Pass
                </button>
              </div>

              {/* <p className="banner-one__tag-line">
                <a href="#"></a>
              </p> */}
            </div>
            {/*   <div>
              <FormEmbed
                style={{
                  marginTop: "10px",
                  overflow: "hidden",
                  backgroundColor: "white",
                  border: "1px solid rgb(221, 221, 221)",
                  borderRadius: "12px",
                  boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
                }}
                height="150px"
                slug="homepage-email-form"
                scrolling="no"
                company="unitabiz"
                userid="open"
                username="open"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
