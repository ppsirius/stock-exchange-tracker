var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var fetch = require('node-fetch')
var axios = require('axios')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    getCompany(name: String!): Company
  }

  type Company {
    name: String!
  }
`);

// const companyGetter = async (name) => {
//   const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=42342fds234243`

//   axios.get(url).then(res => {
//     return res.data.bestMatches[0]["2. name"]
//   })
// }

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  // getCompany: companyGetter(name)
  getCompany: async (_, {name}) => {

    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=42342fds2re34243`
    const res = await axios.get(url)
      .then(response => {
        
        console.log(response.data)
        return 'llllll'
      }
    )
    // console.log(res.bestMatches[0]["2. name"])
    return res
    // console.log(res.bestMatches[0]["2. name"], 'lollll' );
    // return res.bestMatches[0]["2. name"]

  }
};

// const fetchData = async (name) => {
//   const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=42342fds234243`
//   const response = await fetch(url)
//   const res = await response.json()
//   console.log(res.bestMatches[0]["2. name"])
//   return res.bestMatches[0]["2. name"]
// }

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
// console.log(fetchData('FB'))
console.log('Running a GraphQL API server at localhost:4000/graphql');

