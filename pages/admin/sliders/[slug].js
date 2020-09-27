import React from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import ViewImageSlider from "../../../src/app/components/imageSlider/ViewImageSlider";

const SliderPage = () => {
  const router = useRouter();
  return (
    <Layout pageTitle="Unitabiz | Slider">
      <Navbar />
      <PageHeader title="Slider" />
      <div className="p-3">
        {router.query.slug && (
          <ViewImageSlider slug={router.query.slug} showError={true} />
        )}
      </div>
      <Footer />
    </Layout>
  );
};

export default SliderPage;
