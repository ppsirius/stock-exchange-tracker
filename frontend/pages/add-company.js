import AlphaVantageApi from "../api/alpha-vantage";
import store from "store";
import Router from "next/router";
import { hasErrors, success, error } from "../utils/";

// Ant Design
import { Form, Input, Button, Row, Col } from "antd";

class AddCompany extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.fetchCompany();
  };

  fetchCompany = () => {
    const companySymbol = this.props.form
      .getFieldValue("companySymbol")
      .toUpperCase();

    const searchSymbol = AlphaVantageApi.searchSymbol(companySymbol);
    const getQuote = AlphaVantageApi.getQuote(companySymbol);

    Promise.all([searchSymbol, getQuote]).then(res => {
      if (res[0].symbol) {
        // @todo company type "Mutual Fund" doesn't return quote
        const company = { ...res[0], ...res[1] };
        store.set("stock_exchange_" + companySymbol, company);
        success();

        // readirect to companies after 1,5s
        setTimeout(() => {
          Router.push({
            pathname: "/companies"
          });
        }, 1500);
      } else {
        error();
      }
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

        <Row>
          <Col span={10}>
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              <Form.Item
                validateStatus={companySymbolError ? "error" : ""}
                help={companySymbolError || ""}
                extra="Provide the stock exchange symbol of a company you want to track"
              >
                {getFieldDecorator("companySymbol", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your company symbol!"
                    }
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
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedAddCompany = Form.create({ name: "addCompany" })(AddCompany);

export default WrappedAddCompany;
