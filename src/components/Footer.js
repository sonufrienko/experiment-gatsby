import React from "react"
import { Layout } from "antd"

const Header = () => (
  <Layout.Footer style={{ textAlign: "center" }}>
    Real Estate ©{new Date().getFullYear()}
  </Layout.Footer>
)

export default Header
