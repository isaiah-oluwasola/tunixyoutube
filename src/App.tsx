import { CinemaProvider } from "./context/CinemaContext";
import Scene from "./three/Scene";
import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";
import Footer from "./components/Footer";
import ToTopButton from "./components/ToTopButton";
import Hero from "./sections/Hero";
import LogoOpening from "./sections/LogoOpening";
import VideoUniverse from "./sections/VideoUniverse";
import Featured from "./sections/Featured";
import About from "./sections/About";
import Subscribe from "./sections/Subscribe";

export default function App() {
  return (
    <CinemaProvider>
      <div className="relative min-h-screen bg-black text-white">
        <Scene />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Ticker />
          <LogoOpening />
          <VideoUniverse />
          <Featured />
          <About />
          <Subscribe />
        </main>
        <Footer />
        <ToTopButton />
      </div>
    </CinemaProvider>
  );
}
