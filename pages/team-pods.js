import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import TeamPods from "../components/TeamPods";
import Footer from "../components/Footer";



const TeamPodsPage = () => (

    <Layout pageTitle="Unitabiz - Team Pods">
        <Navbar />
        <PageHeader title="Team Pods" />
        <TeamPods />
        <Footer />
    </Layout>

)

export default TeamPodsPage;