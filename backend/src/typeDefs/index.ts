import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import * as path from "path";

const typesArray = loadFilesSync(path.join(__dirname, "/**/*.graphql"));

const typeDefs = mergeTypeDefs(typesArray);
export default typeDefs;
