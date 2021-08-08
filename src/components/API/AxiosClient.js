import axios from "axios";
const domain = "https://disease.sh/v3/covid-19";
const newsApi = "https://article-json-server.herokuapp.com/articles";
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

export const getNews = (size) => {
  return axios.get(newsApi);
};

export const getHistorical = (area) => {
  return axios.get(domain + `/historical/${area}?lastdays=all`);
};
export const getAllCountries = () => {
  return axios.get(domain + "/countries");
};
