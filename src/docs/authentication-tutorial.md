---
title: "Making a Site with User Authentication"
---

Sometimes, you need to create a site with gated content, restricted to only authenticated users. Using Gatsby, you may achieve this using the concept of [client-only routes](/docs/client-only-routes-and-user-authentication/), to define which pages a user can view only after logging in.

## Prerequisites

You should have already configured your environment to be able to use the `gatsby-cli`. A good starting point is the [main tutorial](/tutorial).

## Security notice

In production, you should use a tested and robust solution to handle the authentication. [Auth0](https://www.auth0.com), [Firebase](https://firebase.google.com), and [Passport.js](http://passportjs.org) are good examples. This tutorial will only cover the authentication workflow, but you should take the security of your app as seriously as possible.

## Building your Gatsby app

Start by creating a new Gatsby project using the barebones `hello-world` starter:

```shell
gatsby new gatsby-auth gatsbyjs/gatsby-starter-hello-world
cd gatsby-auth
```

Create a new component to hold the links. For now, it will act as a placeholder:

```jsx:title=src/components/nav-bar.js
import React from "react"
import { Link } from "gatsby"

export default () => (
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    <span>You are not logged in</span>

    <nav>
      <Link to="/">Home</Link>
      {` `}
      <Link to="/">Profile</Link>
      {` `}
      <Link to="/">Logout</Link>
    </nav>
  </div>
)
```