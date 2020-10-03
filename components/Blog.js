import React, { useEffect, useState } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import { client } from "../src/app/graphql/index";
import { showLoading, hideLoading } from "react-redux-loading";
import { connect } from "react-redux";

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

const Blog = (props) => {
  const [allRooms, setAllRooms] = useState([]);
  const getRooms = async () => {
    props.dispatch(showLoading());

    try {
      let { data } = await client.query({
        query: GET_ALL_ROOMS,
      });
      setAllRooms(data.getAllRooms);
      props.dispatch(hideLoading());
    } catch (error) {
      console.log(err);
      props.dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <section className="blog-one blog-one__home blog-one__grid">
      {allRooms.length > 0 && (
        <div className="container">
          <div className="row">
            {allRooms.length > 0 &&
              allRooms.map((r, i) => {
                const roomImage = r.images.filter(
                  (i) =>
                    i.original.split(".").pop().toLowerCase() === "jpg" ||
                    i.original.split(".").pop().toLowerCase() === "jpeg" ||
                    i.original.split(".").pop().toLowerCase() === "png" ||
                    i.original.split(".").pop().toLowerCase() === "gif"
                );
                return (
                  <div key={i} className="col-lg-4 col-md-6">
                    <div className="blog-one__single">
                      <div className="blog-one__image">
                        <img src={roomImage[0].original} alt={r.title} />
                      </div>
                      <div className="blog-one__content p-2">
                        <h3>
                          <Link href={`/offices/${r.slug}`}>
                            <a>{r.title}</a>
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="post-pagination">
            <a href="#">
              <i className="fa fa-angle-left"></i>
            </a>
            <a href="#" className="active">
              1
            </a>
            {/* <a href="#" className="active">
            2
          </a>
          <a href="#">3</a> */}
            <a href="#">
              <i className="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
export default connect()(Blog);
