import React from "react";
import Link from "next/link";
import Head from "next/head";
import App from "next/app";
import "antd/dist/antd.css";
// @todo separate nav
// import Nav from "../components/nav";

import { Layout as LayoutAntd } from "antd";
const { Header, Content } = LayoutAntd;

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Head>
          <title>Stock Exchange</title>
        </Head>

        <LayoutAntd>
          <Header>
            <div className="logo">
              <Link href="/">
                <a>Stock Exchange</a>
              </Link>
              <Link href="/companies">
                <a>Companies</a>
              </Link>
            </div>
          </Header>
          <Content style={{ minHeight: "calc(100vh - 64px)" }}>
            {children}
          </Content>
        </LayoutAntd>
      </div>
    );
  }
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
