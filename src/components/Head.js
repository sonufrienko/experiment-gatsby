import React from "react"
import { Link } from "gatsby"
import { Menu, Layout } from "antd"
import { UpSquareOutlined } from "@ant-design/icons"

const Head = () => (
  <Layout.Header>
    <Link className="logo" to="/">
      <UpSquareOutlined className="icon" />
      Real Estate
    </Link>
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="about">
        <Link to="/about">About</Link>
      </Menu.Item>
      <Menu.Item key="contact">
        <Link to="/contact">Contact Us</Link>
      </Menu.Item>
    </Menu>
  </Layout.Header>
)

export default Head

