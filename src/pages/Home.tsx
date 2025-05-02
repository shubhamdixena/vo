import Header from "../components/Header"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import ImpactSection from "../components/ImpactSection"
import WhyWaterSection from "../components/WhyWaterSection"
import PrepTalkSection from "../components/PrepTalkSection"
import ActionSection from "../components/ActionSection"

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ImpactSection />
        <WhyWaterSection />
        <PrepTalkSection />
        <ActionSection />
      </main>
      <Footer />
    </div>
  )
}

export default Home
