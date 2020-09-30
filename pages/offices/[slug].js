import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import ProductImageDescription from "../../src/app/wrappers/ProductImageDescription";
import NotFound from "../../src/app/components/other/NotFound";
import { client } from "../../src/app/graphql/index";
import { gql } from "@apollo/client";

const GET_ONE_ROOM_BY_SLUG = gql`
  query GetOneRoomBySlug($slug: String!, $userId: String!) {
    getOneRoomBySlug(slug: $slug, userId: $userId) {
      _id
      userId
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
const OfficePage = ({ room }) => {
  const router = useRouter();
  const [newRoom, setNewRoom] = useState();
  const [showError, setShowError] = useState(false);
  useEffect(async () => {
    try {
      const room = await client.query({
        query: GET_ONE_ROOM_BY_SLUG,
        variables: {
          slug: router.query.slug,
          userId: "c8ae5f4b-3e52-4afb-b282-3abf09350439",
        },
      });
      if (room.data.getOneRoomBySlug === null) {
        setShowError(true);
      } else {
        setNewRoom(room.data.getOneRoomBySlug);
        console.log(room.data.getOneRoomBySlug);
      }
    } catch (error) {
      setShowError(true);
      console.log(error);
    }
  }, []);
  return (
    <Layout room={room} pageTitle="Unitabiz | Office">
      <Navbar />
      <PageHeader title="Offices" />
      <div className="p-3">
        {newRoom ? (
          <ProductImageDescription room={newRoom} />
        ) : (
          showError && <NotFound />
        )}
      </div>
      <Footer />
    </Layout>
  );
};

export default OfficePage;

export async function getServerSideProps({ query }) {
  const { slug } = query;
  const room = await client.query({
    query: GET_ONE_ROOM_BY_SLUG,
    variables: { slug: slug, userId: "c8ae5f4b-3e52-4afb-b282-3abf09350439" },
  });

  return {
    props: { room: room.data.getOneRoomBySlug },
  };
}