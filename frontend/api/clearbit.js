import axios from "axios";

// Company logo and website
// https://clearbit.com/docs?javascript#company-api

const searchCompanyLogo = async companyName => {
  const formatedName = companyName.replace(/ Inc.| L.P.| Limited/gi, "");

  const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${formatedName}`;
  return await axios.get(url).then(res => {
    return res.data[0];
  });
};

export default {
  searchCompanyLogo
};
