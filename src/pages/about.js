import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const pageQuery = graphql`
  {
    contentfulPage(slug: { eq: "about" }) {
      pageTitle
      text {
        childMarkdownRemark {
          html
        }
      }
      metaDescription
    }
  }
`

const AboutPage = () => {
  const { contentfulPage } = useStaticQuery(pageQuery)
  const { pageTitle, metaDescription, text } = contentfulPage
  const html = text.childMarkdownRemark.html

  return (
    <Layout>
      <SEO title={pageTitle} description={metaDescription} />
      <div className="pageContent" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default AboutPage
