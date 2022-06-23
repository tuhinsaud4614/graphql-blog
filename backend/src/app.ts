import { createServer, renderGraphiQL } from "@graphql-yoga/node";
import express from "express";
import path from "path";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { createContext } from "./utils";

const app = express();

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  renderGraphiQL,
  context: (props) => createContext(props),
});

// app.use(helmet());
// app.use(compression());
app.use("/images", express.static(path.join(process.cwd(), "images")));
app.use("/graphql", server);

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
