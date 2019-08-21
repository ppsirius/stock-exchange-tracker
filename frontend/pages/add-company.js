import AlphaVantageApi from "../api/alpha-vantage";
import store from "store";
import Router from "next/router";

// Ant Design
import { Form, Input, Button, message } from "antd";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const success = () => {
  message.success("Company is added");
};

const error = () => {
  message.error(`Company symbol doesn't exist`);
};

class AddCompany extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    const companySymbol = this.props.form
      .getFieldValue("companySymbol")
      .toUpperCase();

    AlphaVantageApi.searchSymbol(companySymbol).then(companySymbolResponse => {
      AlphaVantageApi.getQuote(companySymbol).then(companyQuoteResponse => {
        const company = { ...companySymbolResponse, ...companyQuoteResponse };

        if (company.symbol) {
          store.set("stock_exchange_" + companySymbol, company);
          success();

          setTimeout(() => {
            Router.push({
              pathname: "/companies"
            });
          }, 2000);
        } else {
          error();
        }
      });
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const companySymbolError =
      isFieldTouched("companySymbol") && getFieldError("companySymbol");
    return (
      <div>
        <h1>Track new company</h1>

        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={companySymbolError ? "error" : ""}
            help={companySymbolError || ""}
            extra="Provide the stock exchange symbol of a company you want to track"
          >
            {getFieldDecorator("companySymbol", {
              rules: [
                { required: true, message: "Please input your company symbol!" }
              ]
            })(
              // @todo on debounce we should check that typed symbol is exist in API
              <Input placeholder="Company symbol" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Track
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedAddCompany = Form.create({ name: "addCompany" })(AddCompany);

export default WrappedAddCompany;
