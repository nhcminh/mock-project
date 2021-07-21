import * as React from "react";
import { useState, useRef } from "react";
import MapGL, { Source, Layer } from "react-map-gl";

// import {
//   clusterLayer,
//   clusterCountLayer,
//   unclusteredPointLayer,
// } from "./Layers";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWluaG5oYzQ3IiwiYSI6ImNrcmRjMTh2dDI5bTQyd2xwMXk3aTZ4cHYifQ.HAy6VhorM-lnsskIWAML8Q"; // Set your mapbox token here

export default function Maps() {
  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: { type: "Point", coordinates: [-122.4, 37.8] },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  return (
    <>
      <MapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        width="100%"
        height="50vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Source id="covid19" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </MapGL>
    </>
  );
}
