import { isDev } from "@/utils/type-check";

import loggerDev from "./logger.dev";
import loggerProd from "./logger.prod";

export default isDev() ? loggerDev() : loggerProd();
