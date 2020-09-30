import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import FormEmbed from "../../src/app/components/formBuilder/FormEmbed";

const BlogPage = () => (
  <Layout pageTitle="Unitabiz | Podcast">
    <Navbar />
    <PageHeader title="Podcast" />
    <FormEmbed slug="podcast-studio-1-hour-free" />
    <Footer />
  </Layout>
);

export default BlogPage;
