import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Ant Design
import { Layout as LayoutAntd, Menu } from "antd";
const { Header } = LayoutAntd;
import { Row, Col } from "antd";

const Nav = () => {
  const router = useRouter();
  return (
    <Header>
      <Row type="flex" justify="start">
        <Col xs={20} sm={8} md={6} lg={4}>
          <div className="logo">
            <Link href="/">
              <a>Stock Exchange</a>
            </Link>
          </div>
        </Col>
        <Col xs={4} md={16}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            selectedKeys={[router.pathname]}
            style={{ lineHeight: "64px" }}
          >
            {/* @todo fix active element */}
            <Menu.Item key="/companies">
              <Link href="/companies">
                <a>Companies</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/add-company">
              <Link href="/add-company">
                <a>Track new company</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>

      <style jsx>{`
        .logo a {
          color: #fff;
          font-weight: 700;
          font-size: 16px;
        }
      `}</style>
    </Header>
  );
};

export default Nav;
