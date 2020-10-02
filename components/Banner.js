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
  console.log("data = ", data);
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
        className="banner-one__shape-2"
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
          src="/assets/images/shapes/MICROPHONE.png"
          alt=""
          className="banner-one__shape-moc-1"
        />
        <img
          src="/assets/images/mocs/room.jpg"
          alt=""
          className="banner-one__moc"
        />
        <div className="row">
          <div className="col-lg-6">
            <div className="banner-one__content">
              <p className="banner-one__tag-line">
                Creative Hub for Innovators <a href="#">free trial</a>
              </p>
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
            <Table bordered hover size="sm">
              <tbody
                style={{
                  height: "300px !important",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                {data && data.getAllRooms !== null
                  ? data.getAllRooms.map((r, i) => {
                      const roomImage = r.images.filter(
                        (i) =>
                          i.original.split(".").pop().toLowerCase() === "jpg" ||
                          i.original.split(".").pop().toLowerCase() ===
                            "jpeg" ||
                          i.original.split(".").pop().toLowerCase() === "png" ||
                          i.original.split(".").pop().toLowerCase() === "gif"
                      );
                      return (
                        <tr key={i}>
                          <td className="text-center">
                            <Link href={`/offices/${r.slug}`}>
                              <a className="text-light">
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
                              {roomImage[1] && (
                                <img
                                  className="ml-1"
                                  style={{ width: "100px" }}
                                  src={roomImage[1].thumbnail}
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
            <div>
              <FormEmbed height="240px" slug="homepage-email-form" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
