const {buildSchema} = require('graphql');

module.exports = buildSchema(
    // name : return type is the format
    `
    type: TestData{
        text: String!
        views: Int!
    }

    type: RootQuery{
        hello : TestData
    }
    schema{
        query: RootQuery
    }
`);