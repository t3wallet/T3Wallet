import { resolve } from "path";
import fs from "fs";

export default {
  alias: {
    themes: resolve(__dirname, "./src/themes"),
    components: resolve(__dirname, "./src/components"),
    utils: resolve(__dirname, "./src/utils"),
    config: resolve(__dirname, "./src/utils/config"),
    models: resolve(__dirname, "./src/models"),
    services: resolve(__dirname, "./src/services")
  },
  urlLoaderExcludes: [/\.svg$/]
};
