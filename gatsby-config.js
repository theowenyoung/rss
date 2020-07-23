const keywords =
  "肯德基|冰淇淋|雪糕|烤箱|科颜氏白泥|免费领|0元|u先|U先|深水泡弹|三分钟|清洁面膜"
const filterKeywords = "求购|已购|交流"

const pinGroupQuery = {
  filter_title: keywords,
  filterout_title: filterKeywords,
  filter_case_sensitive: false,
}
module.exports = {
  siteMetadata: {
    title: `Rsshub Static List`,
    description: `Make rsshub static`,
    author: `@theowenyoung`,
    siteUrl: "https://rss.owenyoung.com",
  },
  plugins: [
    {
      resolve: `gatsby-source-rsshub`,
      options: {
        query: {
          // mode: "fulltext",
        },
        rsshub: [
          "/douban/movie/playing",
          "/douban/movie/playing/8.5",
          "/douban/movie/weekly",
          "/weseepro/newest-direct",
          "/atfd/cn+shenzhen/1",
          "/flyertea/preferential",
          "/smzdm/ranking/haitao/39/3",
          "/initium/news-brief/zh-hans",
          "/weibo/user/2496970172",
          {
            url: "/weibo/user/2496970172",
            query: {
              filter: "肯德基|麦当劳|fresh|馥蕾诗",
            },
            slug: "/live/sale",
          },
          "/douban/group/698716",
          {
            url: "/douban/group/698716",
            query: pinGroupQuery,
            slug: "/sale/douban-pin-group",
          },
          {
            url: "/douban/group/669481",
            query: pinGroupQuery,
            slug: "/sale/douban-driver-group",
          },
        ],
        cacheTime: 5 * 60 * 10000,
      },
    },
    {
      resolve: `gatsby-plugin-rsshub`,
      options: {
        indexPath: "/",
        templateDataSerialize(data) {
          if (data && data.item && Array.isArray(data.item)) {
            data.item = data.item.map(item => {
              if (item.description) {
                item.description = item.description.replace(/<[^>]*>/g, "")
                if (item.description) {
                  item.description = item.description.trim()
                  if (item.description.length > 25) {
                    item.description = `${item.description.substring(0, 25)}...`
                  }
                }
              }
              if (
                item.title &&
                (data.link === "https://www.douban.com/group/669481/" ||
                  data.link === "https://www.douban.com/group/698716/")
              ) {
                item.title = item.title.replace(/\[来自.+\]/g, "")
              }
              return item
            })
          }
          return data
        },
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
