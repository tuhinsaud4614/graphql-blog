import { isDev } from "@/utils/type-guard";

import loggerDev from "./logger.dev";
import loggerProd from "./logger.prod";

export default isDev() ? loggerDev() : loggerProd();
