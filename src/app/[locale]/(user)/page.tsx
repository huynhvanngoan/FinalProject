import AboutInfo from "@/components/homeComponents/AboutInfo";
import ClientLogos from "@/components/homeComponents/ClientLogos";
import ExplorePlace from "@/components/homeComponents/ExplorePlace";
import FeatureCard from "@/components/homeComponents/FeatureCard";
import HeroSection from "@/components/homeComponents/HeroSection";
import MostPopularTour from "@/components/homeComponents/MostPopularTour";
import TravelBlog from "@/components/homeComponents/TravelBlog";
import TravelExperiences from "@/components/homeComponents/TravelExperiences";
import VideoEmbed from "@/components/shared/VideoEmbed";
export default function Home() {
    return (
        <main className="bg-secondary size-full hide-scrollbar flex flex-col">
            <HeroSection />
            <div className=" container">
                <MostPopularTour />

                <AboutInfo />
            </div>
            <ClientLogos />
            <div className="p-10 lg:p-16 xl:p-24">
                <ExplorePlace />
            </div>
            <VideoEmbed videoId="1025488545" />
            <div className="container">
                <FeatureCard />
                <TravelExperiences />
                <TravelBlog />
            </div>
        </main>
    );
}
