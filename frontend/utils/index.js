import { message } from "antd";

export const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

export const success = () => {
  message.success("Company is added");
};

export const error = () => {
  message.error(`Company symbol doesn't exist`);
};
