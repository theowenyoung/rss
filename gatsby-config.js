const keywords =
  "罐头|狗粮|爱肯拿|zeal|驱虫|姐妹们快|反薅|牛奶|试用|话费|免费|0元买|0元入|肯德基|麦当劳|冰淇淋|烤箱|生鲜|白泥|u先|深水泡弹|三分钟|清洁面膜|医美面膜|敷尔佳|螺蛳粉|米诺|抽奖|芙清|果酸|烟酰胺身体乳"
const filterKeywords =
  "求|转|求购|交流|已购|专楼|蒙牛|伊利|闲置|出|讨论|华为|开车|停车"

const pinGroupQuery = {
  filter_title: keywords,
  filterout_title: filterKeywords,
  filter_case_sensitive: false,
}
const dogGroupQuery = {
  filter_title: "爱肯拿|狗粮|驱|滴剂|优惠|抽奖|奶|罐头|k9|巅峰|福来恩|zeal",
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
          "/douban/group/blabla",
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
          // {
          //   url: "/douban/group/656297",
          //   query: dogGroupQuery,
          //   slug: "/sale/douban-cat-group",
          // },
          {
            url: "/douban/group/657658",
            query: dogGroupQuery,
            slug: "/sale/douban-dog-group",
          },
        ],
        cacheTime: 1 * 60 * 1000,
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
