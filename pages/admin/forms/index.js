import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import FormEmbbed from "../../../src/app/components/formBuilder/FormEmbbed";

const FormsPage = () => {
  return (
    <Layout pageTitle="Unitabiz | Forms">
      <Navbar />
      <PageHeader title="Manage Forms" />
      <div className="p-3">
        <FormEmbbed slug="create-room-form" />
      </div>
      <Footer />
    </Layout>
  );
};

export default FormsPage;
