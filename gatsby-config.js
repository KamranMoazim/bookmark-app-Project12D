/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-transformer-sharp`
    }
  ],
  plugins: ["gatsby-plugin-typescript", `gatsby-plugin-material-ui`],
}


// module.exports = {
//   plugins: [
//     {
//       resolve: `gatsby-transformer-sharp`
//     },
//     // your another plugins
//   ]
// };