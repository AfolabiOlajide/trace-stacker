import HomeFeature from "@/components/home/HomeFeature";
import HomeHero from "@/components/home/HomeHero";
import HomeHowItWorks from "@/components/home/HomeHowItWorks";
import HomeUseCase from "@/components/home/HomeUseCase";

const HomePage = () => {
    return (
        <div className="">
            <HomeHero />
            <HomeFeature />
            <HomeHowItWorks />
            <HomeUseCase />
        </div>
    );
};

export default HomePage;
