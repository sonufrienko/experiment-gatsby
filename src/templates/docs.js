import React from "react"
import { PageHeader } from "antd"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

const DocsTemplate = ({ data }) => {
  const {
    markdownRemark: {
      html,
      frontmatter: { title },
    },
  } = data

  return (
    <Layout>
      <SEO title={title} />
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title={title}
      ></PageHeader>

      <div
        style={{ margin: '16px 24px' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export default DocsTemplate
