import React from "react";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import RoomCRUD from "../../../src/app/components/room/RoomCRUD";
import AuthRequired from "../../../src/app/components/other/AuthRequired";

const OfficesPage = () => (
  <Layout pageTitle="Unitabiz | Offices">
    <Navbar />
    <PageHeader title="Offices" />
    <AuthRequired redirectPath="/admin/offices" mustAdmin={true}>
      <div className="p-3">
        <RoomCRUD />
      </div>
    </AuthRequired>
    <Footer />
  </Layout>
);

export default OfficesPage;
