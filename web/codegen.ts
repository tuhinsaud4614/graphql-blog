
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",
  documents: "graphql/**/*.{gpl,graphql}",
  generates: {
    "graphql/generated/schema/": {
      preset: "client",
      plugins: []
    },
    "graphql/generated/graphql.schema.json": {
      plugins: ["introspection"],
      config: {
        minify: true
      },
    }
  }
};

export default config;
