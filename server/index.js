const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");

const users = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    posts: [
      { id: 1, title: "Post 1", content: "Content 1" },
      { id: 2, title: "Post 2", content: "Content 2" },
    ],
  },
];

const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const app = express();

app.use(cors());

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id === id);
  },
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);
// server connect
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
