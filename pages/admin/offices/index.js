import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import RoomCRUD from "../../../src/app/components/room/RoomCRUD";

const OfficesPage = () => (
  <Layout pageTitle="Unitabiz | Offices">
    <Navbar />
    <PageHeader title="Offices" />
    <div className="p-3">
      <RoomCRUD />
    </div>
    <Footer />
  </Layout>
);

export default OfficesPage;
