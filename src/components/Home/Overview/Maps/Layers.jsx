export const dataLayer = {
  type: "circle",
  paint: {
    "circle-radius": {
      property: "cases",
      stops: [
        [{ zoom: 0, value: 0 }, 0],
        [{ zoom: 0, value: 1000000 }, 7],
        [{ zoom: 3, value: 0 }, 5],
        [{ zoom: 3, value: 5000 }, 10],
        [{ zoom: 3, value: 10000 }, 15],
        [{ zoom: 3, value: 25000 }, 20],
        [{ zoom: 3, value: 50000 }, 22],
        [{ zoom: 3, value: 100000 }, 30],
        [{ zoom: 20, value: 5 }, 20],
      ],
    },
    "circle-color": [
      "step",
      ["get", "cases"],
      "#3288bd",
      5000,
      "#66c2a5",
      10000,
      "#abdda4",
      25000,
      "#e6f598",
      50000,
      "#ffffbf",
      100000,
      "#d53e4f",
    ],
    "circle-opacity": 0.6,
  },
};
export const dataCasesLayer = {
  id: "cases",
  type: "symbol",
  source: "covid19",
  filter: ["has", "cases"],
  layout: {
    "text-field": "{cases}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};
