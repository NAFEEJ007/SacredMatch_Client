import Banner from "../../components/Banner";
import PremiumMembers from "../../components/PremiumMembers";
import HowItWorks from "../../components/HowItWorks";
import SuccessCounter from "../../components/SuccessCounter";
import SuccessStory from "../../components/SuccessStory";

const Home = () => {
    return (
        <div>
            <Banner />
            <PremiumMembers />
            <HowItWorks />
            <SuccessCounter />
            <SuccessStory />
        </div>
    );
};

export default Home;
