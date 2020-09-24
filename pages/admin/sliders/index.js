import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import ImageSliderCRUD from "../../../src/app/components/imageSlider/ImageSliderCRUD";

const SlidersPage = () => (
  <Layout pageTitle="Unita | Sliders">
    <Navbar />
    <PageHeader title="Manage Sliders" />
    <div className="p-3">
      <ImageSliderCRUD />
    </div>
    <Footer />
  </Layout>
);

export default SlidersPage;
