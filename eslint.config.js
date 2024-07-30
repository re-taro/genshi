// @ts-check

import { re_taro } from "@re-taro/eslint-config";

export default re_taro({}, {
  files: ["src/**/*.ts"],
  rules: {
    "re-taro/top-level-function": "off",
  },
});
