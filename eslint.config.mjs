import next from "eslint-config-next";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      // Source photography and its generated derivatives are build inputs,
      // not code.
      "raw-photos/**",
      "public/images/**",
    ],
  },
  ...next,
];

export default config;
