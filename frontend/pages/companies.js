import { List, Avatar, Icon } from "antd";
import store from "store";

const data = [
  {
    name: "Alpabet Inc.",
    symbol: "GOOG",
    website: "abc.xyx",
    country: "United State",
    date: "09:30 - 16:00 UTC-5",
    price: "102.99",
    stats: "-13.73 (1.32%)",
    closed: "2018-11-23"
  },
  {
    name: "Facebook Inc",
    symbol: "FB",
    website: "abc.xyx",
    country: "United State",
    date: "09:30 - 16:00 UTC-5",
    price: "102.99",
    stats: "-13.73 (1.32%)",
    closed: "2018-11-23"
  },
  {
    name: "Vapotherm Inc.",
    symbol: "GOOG",
    website: "abc.xyx",
    country: "United State",
    date: "09:30 - 16:00 UTC-5",
    price: "102.99",
    stats: "+3.73 (4.32%)",
    closed: "2018-11-23"
  }
];

class Companies extends React.Component {
  componentDidMount() {
    store.each(function(value, key) {
      if (key.includes("stock_exchange_")) {
        console.log(key, value);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Companies</h1>

        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
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
                    <span className="company__name mr--20">{item.name}</span>
                    <span className="company__symbol mr--20">
                      {item.symbol}
                    </span>
                    <span className="company__website">{item.website}</span>
                  </div>
                }
                description={
                  <div>
                    <span className="company__country mr--20">
                      {item.country}
                    </span>
                    <span className="company__date">{item.date}</span>
                    <br />
                    <span className="company__price mr--20">
                      {item.price} USD
                    </span>
                    <span className="company__stats mr--20">{item.stats}</span>
                    <span className="company__closed">
                      Closed: {item.closed}
                    </span>
                  </div>
                }
              />
              <div className="company__delete">
                <Icon
                  className="delete__icon"
                  type="close-circle"
                  style={{ fontSize: "24px" }}
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
