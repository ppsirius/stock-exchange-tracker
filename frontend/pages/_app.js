import React from "react";
import App from "next/app";
import Head from "next/head";

// Ant Design
import "antd/dist/antd.css";
import { Layout as LayoutAntd } from "antd";
const { Content } = LayoutAntd;

// Components
import Nav from "../components/nav";

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Head>
          <title>Stock Exchange</title>
        </Head>

        <LayoutAntd>
          <Nav />
          <Content className="content">{children}</Content>
        </LayoutAntd>

        <style jsx>{`
          :global(.content) {
            min-height: calc(100vh - 64px);
            padding: 40px 50px;
          }
        `}</style>
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
