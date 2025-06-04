import React from "react";
import Banner from "../../components/StatePages/BottomBanner/BottomBanner";
import AboutUs from "../../components/StatePages/About/AboutUs";
import Service from "../../components/StatePages/Service/Service";
import Features from "../../components/StatePages/Features/Features";
import Service2 from "../../components/StatePages/Service/Service2";
import AboutUs2 from "../../components/StatePages/About/AboutUs2";
import AboutUs3 from "../../components/StatePages/About/AboutUs3";
function Home(props) {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Service />
      <Features />
      <Service2 />
      <AboutUs2 />
      <AboutUs3 />
    </div>
  );
}

export default Home;
