import { createServer, renderGraphiQL } from "@graphql-yoga/node";
import express from "express";
import path from "path";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { createContext } from "./utils";
import redisClient from "./utils/redis";
require("dotenv").config({
  path: path.join(
    process.cwd(),
    process.env.NODE_ENV === "development" ? "dev.env" : ".env"
  ),
});

const app = express();

const server = createServer({
  cors: { origin: "*" },
  schema: {
    typeDefs,
    resolvers,
  },
  renderGraphiQL,
  context: (props) => createContext(props),
  // maskedErrors: {
  //   formatError(err, msg) {
  //     console.log("err", err);
  //     console.log("msg", msg);

  //     return new GraphQLYogaError(msg);
  //   },
  // },
});

// app.use(helmet());
// app.use(compression());
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/images", express.static(path.join(process.cwd(), "images")));
app.use("/graphql", server);

app.listen(4000, async () => {
  await redisClient.connect();
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
