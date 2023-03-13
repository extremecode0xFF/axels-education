const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const schema = require("./schema/schema");

const app = express();

const PORT = 5000;

const users = [{ id: 1, username: "Isaac", age: 84 }];

const createMUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const root = {
  getAllUsers: () => users,
  getUser: ({ id }) => users.find((user) => user.id === id),
  createUser: ({ input }) => {
    const user = createMUser(input);
    users.push(user);
    return user;
  },
};

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
