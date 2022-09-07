const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["src/**/*.{svelte,ts,js,html}", "index.html"],
  theme: {
    extend: {
      colors: {
        brand: colors.lime,
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(
      function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            "text-shadow": (textShadowSize) => {
              if (Array.isArray(textShadowSize)) {
                return {
                  "--tw-text-shadow-color": theme("colors.gray.500"),
                  textShadow: textShadowSize
                    .map(
                      (indivialShadow) =>
                        `${indivialShadow} var(--tw-text-shadow-color)`
                    )
                    .join(", "),
                };
              }
              return {
                "--tw-text-shadow-color": theme("colors.gray.500"),
                textShadow: `${textShadowSize} var(--tw-text-shadow-color)`,
              };
            },
          },
          {
            values: theme("textShadow"),
          }
        );
        matchUtilities(
          {
            "text-shadow": (textShadowColor) => ({
              "--tw-text-shadow-color": textShadowColor,
            }),
          },
          {
            values: Object.keys(theme("colors")).reduce((acc, color) => {
              Object.keys(theme("colors")[color]).forEach((colorNumber) => {
                const keyName = `${color}-${colorNumber}`;
                acc[keyName] = theme("colors")[color][colorNumber];
              });
              return acc;
            }, {}),
          }
        );
      },
      {
        theme: {
          textShadow: {
            sm: "0 0 2px",
            DEFAULT: "0 1px 5px",
            md: "0 1px 7px",
            lg: "0 1px 12px",
          },
        },
      }
    ),
  ],
};
