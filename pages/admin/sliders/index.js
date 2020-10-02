import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import ImageSliderCRUD from "../../../src/app/components/imageSlider/ImageSliderCRUD";
import AuthRequired from "../../../src/app/components/other/AuthRequired";

const SlidersPage = () => (
  <Layout pageTitle="Unita | Sliders">
    <Navbar />
    <PageHeader title="Manage Sliders" />
    <AuthRequired redirectPath="/admin/sliders" mustAdmin={true}>
      <div className="p-3">
        <ImageSliderCRUD />
      </div>
    </AuthRequired>
    <Footer />
  </Layout>
);

export default SlidersPage;
