import React from "react"
import { Layout } from "antd"
import Head from "./Head"
import Footer from "./Footer"
import "antd/dist/antd.css"
import "./layout.css"

const { Content } = Layout

export default ({ children }) => {
  return (
    <Layout className="layout">
      <Head />
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer />
    </Layout>
  )
}
