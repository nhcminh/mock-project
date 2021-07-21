import React from "react";
import MainLayout from "../../HOC/MainLayout";
import "mapbox-gl/dist/mapbox-gl.css";
import Maps from "./Maps";

function Home(props) {
  return (
    <MainLayout>
      <Maps />
    </MainLayout>
  );
}

export default Home;
