import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MapGL, {
  Source,
  Layer,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../../../redux/slices/countriesSlice";

import { dataLayer, dataCasesLayer } from "./Layers";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWluaG5oYzQ3IiwiYSI6ImNrcmRjMTh2dDI5bTQyd2xwMXk3aTZ4cHYifQ.HAy6VhorM-lnsskIWAML8Q"; // Set your mapbox token here
const geolocateStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

const navStyle = {
  top: 72,
  left: 0,
  padding: "10px",
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};

export default function Maps() {
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const countries = useSelector((state) => state.CountriesReducer.countries);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  const geojson = {
    type: "FeatureCollection",
    features: countries?.map((country) => {
      return {
        type: "Feature",
        properties: {
          country: country.country,
          countryInfo: country.countryInfo,
          cases: country.cases,
        },
        geometry: {
          type: "Point",
          coordinates: [country.countryInfo.long, country.countryInfo.lat],
        },
      };
    }),
  };
  return (
    <>
      <MapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        width="100%"
        height="70vh"
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Source id="covid19" type="geojson" data={geojson}>
          <Layer {...dataLayer} />
          <Layer {...dataCasesLayer} />
        </Source>
        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>
    </>
  );
}
