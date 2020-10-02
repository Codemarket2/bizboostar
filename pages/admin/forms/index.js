import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import FormEmbed from "../../../src/app/components/formBuilder/FormEmbed";
import AuthRequired from "../../../src/app/components/other/AuthRequired";

const FormsPage = () => {
  return (
    <Layout pageTitle="Unitabiz | Forms">
      <Navbar />
      <PageHeader title="Form" />
      <AuthRequired redirectPath="/admin/forms" mustAdmin={true}>
        <div className="p-3">
          <FormEmbed slug="sample-form" />
        </div>
      </AuthRequired>

      <Footer />
    </Layout>
  );
};

export default FormsPage;
