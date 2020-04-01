/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

const PropertyTemplate = path.resolve(`./src/templates/property.js`)
const DocsTemplate = path.resolve(`./src/templates/docs.js`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    try {
      const slug = createFilePath({ node, getNode })
      createNodeField({
        node,
        name: "slug",
        value: slug,
      })
    } catch (err) {}
  }
}

exports.createPages = async function({ actions, graphql }) {
  const {
    data: { allContentfulProperty, allMarkdownRemark },
  } = await graphql(`
    {
      allContentfulProperty {
        edges {
          node {
            slug
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
          }
        }
      }
    }
  `)

  const slugArrayProperty = allContentfulProperty.edges.map(
    ({ node }) => node.slug
  )

  slugArrayProperty.forEach(slug => {
    actions.createPage({
      path: `/property/${slug}`,
      component: PropertyTemplate,
      context: { slug },
    })
  })

  const slugArrayDocs = allMarkdownRemark.edges.map(
    ({ node }) => node.fields.slug
  )

  slugArrayDocs.forEach(slug => {
    // Remove slashes: "/docs-note/" -> "docs-note"
    const fileName = slug.replace(/\//g, "")

    actions.createPage({
      path: `/docs/${fileName}`,
      component: DocsTemplate,
      context: { slug },
    })
  })
}
