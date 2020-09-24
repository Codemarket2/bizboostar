import React from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import Signin from "../../src/app/screens/auth/Signin";

const SigninPage = () => (
  <Layout pageTitle="Zimed | Blog">
    <Navbar />
    <PageHeader title="Sign-in" />
    <div className="p-5">
      <Signin />
    </div>
    <Footer />
  </Layout>
);

export default SigninPage;
