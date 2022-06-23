import { YogaInitialContext } from "@graphql-yoga/node";
import { IncomingMessage, ServerResponse } from "http";
import createContext from "./context";

export type YogaContextType = YogaInitialContext & {
  req: IncomingMessage;
  res: ServerResponse;
};

export type YogaContextReturnType = ReturnType<typeof createContext>;
