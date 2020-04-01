import React from "react"
import Image from "gatsby-image"
import { PageHeader, Button, Descriptions, Carousel } from "antd"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export const query = graphql`
  query($slug: String!) {
    contentfulProperty(slug: { eq: $slug }) {
      area
      bathrooms
      bedrooms
      currency
      land
      location
      price
      slug
      title
      description {
        childMarkdownRemark {
          html
        }
      }
      photos {
        fluid(maxWidth: 640) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

const PropertyTemplate = ({ data }) => {
  const {
    contentfulProperty: {
      title,
      price,
      currency,
      area,
      bathrooms,
      bedrooms,
      land,
      location,
      photos,
      description,
    },
  } = data

  const html = description.childMarkdownRemark.html
  const priceFormatted = `${price.toLocaleString()} ${currency}`

  return (
    <Layout>
      <SEO title={title} />
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title={title}
        extra={[
          <Button key="2">Contact Us</Button>,
          <Button key="1" type="primary">
            Buy
          </Button>,
        ]}
      >
        <>
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Habitable area">
              {area} m
            </Descriptions.Item>
            <Descriptions.Item label="Bathrooms">{bathrooms}</Descriptions.Item>
            <Descriptions.Item label="Price">
              <span style={{ color: "green" }}>{priceFormatted}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Land">{land} m</Descriptions.Item>
            <Descriptions.Item label="Bedrooms">{bedrooms}</Descriptions.Item>
            <Descriptions.Item label="Location">{location}</Descriptions.Item>
          </Descriptions>
        </>
      </PageHeader>

      <Carousel dotPosition="top" style={{ margin: '0 24px' }}>
        {photos.map((item, i) => (
          <div key={i}>
            <Image fluid={item.fluid} />
          </div>
        ))}
      </Carousel>

      <div
        style={{ margin: '16px 24px' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export default PropertyTemplate
