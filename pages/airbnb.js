import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import Product from "../src/app/components/airbnb/Product";
import Footer from "../components/Footer";

const Home = () => (
  <Layout pageTitle="Unitabiz">
    <Navbar />
    <PageHeader title="AIRBNB" />
    <Product />
    <Footer />
  </Layout>
);

// export default Home;
export default Home;
