import { Form, Input, Button } from "antd";
import AlphaVantageApi from "../api/alpha-vantage";
import store from "store";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddCompany extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    AlphaVantageApi.searchSymbol(
      this.props.form.getFieldValue("companySymbol")
    ).then(res => {
      store.set(
        "stock_exchange_" + this.props.form.getFieldValue("companySymbol"),
        res
      );
      console.log(res);
    });
    // this.props.form.validateFields((err, values) => {
    //   // @todo temporary solution from ant design lib
    //   if (!err) {
    //     console.log("Received values of form: ", values);
    //   } else {
    //     console.log(e.target);
    //     AlphaVantageApi.searchSymbol(e.target);
    //   }
    // });
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
            })(<Input placeholder="Company symbol" />)}
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
