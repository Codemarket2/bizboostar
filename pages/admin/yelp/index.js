import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import YelpForm from "../../../src/app/components/yelp/YelpForm";
import AuthRequired from "../../../src/app/components/other/AuthRequired";

const BlogPage = () => (
  <Layout pageTitle="Unitabiz | Yelp">
    <Navbar />
    <PageHeader />
    <AuthRequired redirectPath="/admin/offices" mustAdmin={true}>
      <YelpForm />
    </AuthRequired>
    <Footer />
  </Layout>
);

export default BlogPage;
