import React from "react"
import { Layout } from "antd"
import Header from "./Header"
import Footer from "./Footer"
import "antd/dist/antd.css"
import "./layout.css"

const { Content } = Layout

export default ({ children }) => {
  return (
    <Layout className="layout">
      <Header />
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer />
    </Layout>
  )
}
