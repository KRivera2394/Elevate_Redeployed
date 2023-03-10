const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const Keyv = require("keyv");
const { KeyvAdapter } = require("@apollo/utils.keyvadapter");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3030;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cache: new KeyvAdapter(new Keyv()),
  //  mocks: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/me", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/courses/:courseId", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/course/search/:name", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/courses/add", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/module/:moduleId", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
