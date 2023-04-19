import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import * as path from "path";

const resolversArray = loadFilesSync(
  path.join(__dirname, "./**/*.resolver.ts"),
);

const resolvers = mergeResolvers(resolversArray);
export default resolvers;
