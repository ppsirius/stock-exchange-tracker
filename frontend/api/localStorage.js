import store from "store";

export const checkTrackedCompanies = () => {
  const companies = [];
  store.each((value, key) => {
    if (key.includes("stock_exchange_")) {
      companies.push(value);
    }
  });
  return companies;
};

export const removeTrackedCompany = symbol => {
  store.remove(`stock_exchange_${symbol}`);
};
