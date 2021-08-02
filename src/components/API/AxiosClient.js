import axios from "axios";
const domain = "https://disease.sh/v3/covid-19";
const newsApi =
  "https://newsapi.org/v2/everything?q=COVID&apiKey=041d24fcb2004ad997981013ffae5910";
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
  return axios.get(newsApi + `&pageSize=${size}&page=1`);
};

export const getHistorical = (area) => {
  return axios.get(domain + `/historical/${area}?lastdays=all`);
};
export const getAllCountries = () => {
  return axios.get(domain + "/countries");
};
