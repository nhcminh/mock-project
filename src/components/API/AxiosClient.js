import axios from "axios";
const domain = "https://disease.sh/v3/covid-19";

export const getGlobalLastestData = () => {
  return axios.get(domain + "/all");
};

export const getGlobalYesterdayData = () => {
  return axios.get(domain + "/all?yesterday=true");
};

export const getCountriesLastestData = () => {
  return axios.get(domain + "/countries");
};

export const getCountriesYesterdayData = () => {
  return axios.get(domain + "/countries?yesterday=true");
};
