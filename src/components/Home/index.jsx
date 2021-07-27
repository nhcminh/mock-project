import React from "react";
import MainLayout from "../../HOC/MainLayout";
import "mapbox-gl/dist/mapbox-gl.css";
import Overview from "./Overview";
import { useSelector } from "react-redux";
import DataTable from "./DataTable";

function Home(props) {
  const view = useSelector((state) => state.NewsViewReducer.view);
  return (
    <MainLayout>
      {view === "overview" && <Overview />}
      {view === "dataTable" && <DataTable />}
    </MainLayout>
  );
}

export default Home;
