import React from "react";
import Link from "next/link";

// Ant Design
import { Layout as LayoutAntd, Menu } from "antd";
const { Header } = LayoutAntd;
import { Row, Col } from "antd";

const Nav = () => (
  <Header>
    <Row type="flex" justify="start">
      <Col xs={20} sm={6} md={4} lg={3}>
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
          // defaultSelectedKeys={['2']}
          style={{ lineHeight: "64px" }}
        >
          {/* @todo fix active element */}
          <Menu.Item key="1">
            <Link href="/companies">
              <a>Companies</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
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

export default Nav;
