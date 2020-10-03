import React from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import ForgetPassword from "../../src/app/screens/auth/ForgetPassword";

const ForgetPasswordPage = () => (
  <Layout pageTitle="Unitabiz | Signin">
    <Navbar />
    <PageHeader title="Forget Password" />
    <div className="p-5">
      <ForgetPassword />
    </div>
    <Footer />
  </Layout>
);

export default ForgetPasswordPage;
