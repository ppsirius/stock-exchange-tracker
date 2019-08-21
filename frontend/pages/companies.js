import { List, Avatar, Icon } from "antd";
import {
  checkTrackedCompanies,
  removeTrackedCompany
} from "../api/localStorage";

class Companies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: []
    };
  }

  componentDidMount() {
    checkTrackedCompanies().forEach(company => {
      this.setState(prevState => {
        return {
          companies: [...prevState.companies, company]
        };
      });
    });
  }

  deleteCompany = symbol => {
    removeTrackedCompany(symbol);
    this.setState(prevState => {
      return {
        companies: prevState.companies.filter(company => {
          return company.symbol !== symbol;
        })
      };
    });
  };

  render() {
    return (
      <div>
        <h1>Companies</h1>

        <List
          itemLayout="horizontal"
          dataSource={this.state.companies}
          renderItem={company => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    shape="square"
                    size={64}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                }
                title={
                  <div className="company">
                    <span className="company__name mr--20">{company.name}</span>
                    <span className="company__symbol mr--20">
                      {company.symbol}
                    </span>
                    <span className="company__website" />
                  </div>
                }
                description={
                  <div>
                    <span className="company__country mr--20">
                      {company.region}
                    </span>
                    <span className="company__date">{`${company.marketOpen} - ${
                      company.marketClose
                    } ${company.timezone}`}</span>
                    <br />
                    <span className="company__price mr--20">
                      <strong>{company.price}</strong> USD
                    </span>
                    <span className="company__stats mr--20">
                      {company.stats}
                    </span>
                    <span className="company__closed">
                      Closed: {company.closed}
                    </span>
                  </div>
                }
              />
              <div className="company__delete">
                <Icon
                  className="delete__icon"
                  type="close-circle"
                  style={{ fontSize: "24px" }}
                  onClick={() => this.deleteCompany(company.symbol)}
                />
              </div>
            </List.Item>
          )}
        />
        <style jsx>{`
          .company__name {
            font-weight: 700;
            font-size: 20px;
          }
        `}</style>
      </div>
    );
  }
}

export default Companies;
