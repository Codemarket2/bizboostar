import React from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import Signup from "../../src/app/screens/auth/Signup";

const SignupPage = () => (
  <Layout pageTitle="Unitabiz | Signin">
    <Navbar />
    <PageHeader title="Sign-up" />
    <div className="p-5">
      <Signup />
    </div>
    <Footer />
  </Layout>
);

export default SignupPage;
