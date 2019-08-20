import axios from "axios";
import { mapKeys } from "lodash";

const apiKey = "42342fds2re34243";

const searchSymbol = async keyword => {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${apiKey}`;
  return await axios.get(url).then(res => {
    return mapCompanyEntity(filterBestMatches(res.data, keyword));
  });
};

const filterBestMatches = (matches, keyword) => {
  return matches.bestMatches.filter(company => {
    return company["1. symbol"] === keyword;
  });
};

const mapCompanyEntity = companyEntity => {
  if (companyEntity.length > 1) {
    console.log("more than one entity");
  }

  return mapKeys(companyEntity[0], (value, key) => {
    return key.slice(key.indexOf(" ") + 1);
  });
};

export default {
  searchSymbol
};
