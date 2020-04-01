import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { Card, Col, Row, PageHeader, List } from "antd"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const { Meta } = Card

const query = graphql`
  {
    allContentfulProperty(sort: { order: DESC, fields: price }) {
      edges {
        node {
          currency
          photos {
            fluid(maxWidth: 240, maxHeight: 140) {
              ...GatsbyContentfulFluid
            }
          }
          slug
          price
          title
        }
      }
    }
    allMarkdownRemark(
      filter: {
        internal: { type: { eq: "MarkdownRemark" } }
        fields: { slug: { regex: "^/" } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

const DocsList = ({ docs }) => (
  <List style={{ margin: "24px 24px 0 24px" }}
    header={<div>Docs</div>}
    bordered
    dataSource={docs}
    renderItem={item => (
      <List.Item>
        <Link to={`/docs${item.fields.slug}`}>{item.frontmatter.title}</Link>
      </List.Item>
    )}
  />
)

const IndexPage = () => {
  const { allContentfulProperty, allMarkdownRemark } = useStaticQuery(query)
  const docs = allMarkdownRemark.edges.map(({node}) => node);

  return (
    <Layout>
      <SEO title="Real Estate demo page" />
      <PageHeader className="site-page-header" title="Property" />
      <Row gutter={16} style={{ padding: "0 24px" }}>
        {allContentfulProperty.edges.map(({ node }) => {
          const cover = node.photos[0].fluid
          const priceFormatted = `${node.price.toLocaleString()} ${
            node.currency
          }`

          return (
            <Col span={8}>
              <Link to={`/property/${node.slug}`}>
                <Card
                  key={node.title}
                  hoverable
                  style={{ width: 240 }}
                  cover={<Image fluid={cover} />}
                >
                  <Meta title={node.title} description={priceFormatted} />
                </Card>
              </Link>
            </Col>
          )
        })}
      </Row>
      <DocsList docs={docs} />
    </Layout>
  )
}

export default IndexPage
