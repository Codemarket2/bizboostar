import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import Yelp from "../../../src/app/screens/data/Yelp";

const BlogPage = () => (
  <Layout pageTitle="Unitabiz | Yelp">
    <Navbar />
    <PageHeader />
    <Yelp />
    <Footer />
  </Layout>
);

export default BlogPage;
