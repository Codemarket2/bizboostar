import { useQuery, gql } from "@apollo/client";
import React from "react";
import { Table } from "react-bootstrap";
import Link from "next/link";
import FormEmbed from "../src/app/components/formBuilder/FormEmbed";

const GET_ALL_ROOMS = gql`
  query GetAllRooms {
    getAllRooms {
      _id
      title
      slug
      price
      description
      images {
        original
        thumbnail
      }
      youtube
      published
    }
  }
`;

const Banner = () => {
  const { data, loading, error } = useQuery(GET_ALL_ROOMS);
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
                Creative Hub for Innovators <a href="#">free trial</a>
              </p> */}
              <h3>
                Offices & Digital Studios for <br />
                Creative Innovators
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
                maxHeight: "400px !important",
                overflowY: "scroll",
                overflowX: "hidden",
                // overflow: "hidden",
                backgroundColor: "white",
                border: "1px solid rgb(221, 221, 221)",
                borderRadius: "12px",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
              }}
            >
              <Table bordered hover size="sm">
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
                          <tr key={i}>
                            <td className="text-center">
                              <Link href={`/offices/${r.slug}`}>
                                <a className="text-dark">
                                  <b>{r.title}</b>
                                </a>
                              </Link>
                            </td>
                            <td>
                              <div className="text-center">
                                {roomImage[0] && (
                                  <img
                                    //   className="d-inline"
                                    style={{ width: "100px" }}
                                    src={roomImage[0].thumbnail}
                                    alt={r.title}
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
            </div>
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
