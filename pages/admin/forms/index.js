import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import FormEmbed from "../../../src/app/components/formBuilder/FormEmbed";

const FormsPage = () => {
  return (
    <Layout pageTitle="Unitabiz | Forms">
      <Navbar />
      <PageHeader title="Form" />
      <div className="p-3">
        <FormEmbed slug="sample-form" />
      </div>
      <Footer />
    </Layout>
  );
};

export default FormsPage;
