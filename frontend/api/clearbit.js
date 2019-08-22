import axios from "axios";

// Company logo and website
// https://clearbit.com/docs?javascript#company-api

const searchCompanyDetails = async companyName => {
  // @todo clean up sufix in comapny name
  const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`;
  return await axios.get(url).then(res => {
    const response = res;
    console.log(response);
    return response;
  });
};
