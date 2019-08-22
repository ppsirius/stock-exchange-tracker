import classnames from "classnames";
import {
  checkTrackedCompanies,
  removeTrackedCompany
} from "../api/localStorage";
import { green, red } from "@ant-design/colors";
import numeral from "numeral";
import ClearbirApi from "../api/clearbit";
import Link from "next/link";

import { List, Avatar, Icon } from "antd";

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

  componentDidUpdate(prevProps, prevState) {
    this.fetchAndSaveAllCompanyLogoAndDomain();
  }

  fetchAndSaveAllCompanyLogoAndDomain = () => {
    this.state.companies.forEach(company => {
      ClearbirApi.searchCompanyLogo(company.name).then(res => {
        // @todo update in state and local storage
        return res;
      });
    });
  };

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
    const isAnyCompanyAdded = this.state.companies.length > 0;
    return (
      <div>
        <h1>Companies</h1>

        {isAnyCompanyAdded ? (
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
                      <span className="company__name mr--20">
                        {company.name}
                      </span>
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
                      <span className="company__date">{`${
                        company.marketOpen
                      } - ${company.marketClose} ${company.timezone}`}</span>
                      <br />
                      <span className="company__price mr--20">
                        <strong>{numeral(company.price).format("0.00")}</strong>{" "}
                        USD
                      </span>
                      <span
                        className={classnames("company__stats mr--20", {
                          "company__stats--up": Math.sign(company.change) === 1
                        })}
                      >
                        {numeral(company.change).format("0.00")}(
                        {company["change percent"]})
                      </span>
                      <span className="company__closed">
                        Closed: {company["latest trading day"]}
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
        ) : (
          <div>
            <p>
              {/* @todo add some loader befor localstorage is loaded */}
              There are no companies yet.
              <Link href="/add-company">
                <a>Track your first company.</a>
              </Link>
            </p>
          </div>
        )}

        <style jsx>{`
          .company__name {
            font-weight: 700;
            font-size: 20px;
          }
          .company__stats {
            color: ${red[5]};
          }
          .company__stats--up {
            color: ${green[5]};
          }
        `}</style>
      </div>
    );
  }
}

export default Companies;
