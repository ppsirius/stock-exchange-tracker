import axios from "axios";
import { mapKeys } from "lodash";

const apiKey = "42342fds2re34243";

// Company details endpoint
// https://www.alphavantage.co/documentation/

const searchSymbol = async keyword => {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword.toUpperCase()}&apikey=${apiKey}`;
  return await axios.get(url).then(res => {
    return mapCompanyEntity(filterBestMatches(res.data, keyword)[0]);
  });
};

const filterBestMatches = (matches, keyword) => {
  return matches.bestMatches.filter(company => {
    return company["1. symbol"] === keyword;
  });
};

const mapCompanyEntity = companyEntity => {
  return mapKeys(companyEntity, (value, key) => {
    return key.slice(key.indexOf(" ") + 1);
  });
};

const getQuote = async symbol => {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
  return await axios.get(url).then(res => {
    return mapCompanyEntity(res.data["Global Quote"]);
  });
};

export default {
  searchSymbol,
  getQuote
};
