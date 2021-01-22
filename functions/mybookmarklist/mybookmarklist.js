const { ApolloServer, gql } = require('apollo-server-lambda')
var faunadb = require('faunadb'),
  q = faunadb.query;


const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark]
  }
  type Bookmark {
    id: ID!
    title: String!
    url: String!
  }
  type Mutation {
    addBookmark(title: String!, url: String!): Bookmark
    deleteBookmark(id: String!): Bookmark
  }
`



var adminClient = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY});

const resolvers = {
  Query: {
    bookmarks: async (root, args, context) => {
      try {
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('url'))),
            q.Lambda(x => q.Get(x))
          )
        )

        const numberExtractor = (text) => {
          var matches = text.match(/(\d+)/);
          if (matches) { 
              var k = matches[0]; 
              return k
          } 
          return "0"
      }

        return result.data.map(d => {

          let l = numberExtractor(d.ref.toString())

          return {
            id: l,
            title: d.data.title,
            url: d.data.url
          }
        })

      } catch (err) {
        console.log(err);
      }
    }
  },
  Mutation: {
    addBookmark: async (_, { title, url }) => {
      console.log(title, url)
      try {
        const result = await adminClient.query(
          q.Create(
            q.Collection('bookmarks'),
            {
              data: {
                title,
                url
              }
            },
          )
        )
        return result.data.data
      }
      catch (err) {
        console.log(err)
      }
    },
    deleteBookmark: async (_, { id }) => {
      console.log(id)
      try {
        const result = await adminClient.query(
          q.Delete(
            q.Ref(q.Collection('bookmarks'), id)
          )
        )
        return result.data.data
      }
      catch (err) {
        console.log(err)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }

