module.exports = {
  pathPrefix: `/gatsby-starter-rsshub`,
  siteMetadata: {
    title: `Rsshub static demo`,
    description: `Make rsshub static`,
    author: `@theowenyoung`,
    siteUrl: "https://theowenyoung.github.io",
  },
  plugins: [
    {
      resolve: `gatsby-source-rsshub`,
      options: {
        rsshub: ["/douban/movie/playing", "/36kr/newsflashes"],
        cacheTime: 5 * 60 * 10000,
      },
    },
    {
      resolve: `gatsby-plugin-rsshub`,
      options: {
        indexPath: "/",
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
