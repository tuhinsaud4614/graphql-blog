import { isDev } from "@/utils";

import loggerDev from "./logger.dev";
import loggerProd from "./logger.prod";

export default isDev() ? loggerDev() : loggerProd();
