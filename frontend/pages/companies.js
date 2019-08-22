import Link from "next/link";
import classnames from "classnames";
import {
  checkTrackedCompanies,
  removeTrackedCompany
} from "../api/localStorage";
import numeral from "numeral";
import produce from "immer";
import ClearbirApi from "../api/clearbit";

// Ant Design
import { List, Avatar, Icon } from "antd";
import { green, red } from "@ant-design/colors";

class Companies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: []
    };
  }

  async componentDidMount() {
    await checkTrackedCompanies().forEach(company => {
      this.setState(prevState => {
        return {
          companies: [...prevState.companies, company]
        };
      });
    });

    this.state.companies.forEach((company, index) => {
      this.fetchCompanyLogoAndDomain(company, index);
    });

    // @todo should also send request and update quota details
  }

  fetchCompanyLogoAndDomain = (company, index) => {
    if (!company.logo) {
      ClearbirApi.searchCompanyLogo(company.name).then(res => {
        this.setState(
          produce(draft => {
            if (res) {
              draft.companies[index].logo = res.logo;
              draft.companies[index].domain = res.domain;
            } else {
              draft.companies[index].logo = null;
              draft.companies[index].domain = "";
            }
          })
        );
      });
      // @todo update also local storage
      // save image to base64
    }
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
                    <Avatar shape="square" size={64} src={company.logo} />
                  }
                  title={
                    <div className="company">
                      <span className="company__name mr--20">
                        {company.name}
                      </span>
                      <span className="company__symbol mr--20">
                        {company.symbol}
                      </span>
                      <a
                        href={"https://" + company.domain}
                        target="_blank"
                        className="company__website"
                      >
                        {company.domain}
                      </a>
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
                        {numeral(company.change).format("0.00")} (
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
              {/* @todo optional add some loader befor localstorage is loaded */}
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
