import type { ExampleFlow } from "./types.js";

export const productSearch: ExampleFlow = {
  id: "product-search",
  title: "Product search",
  description:
    "Multi-select card grid for choosing products from a search result.",
  longDescription:
    "The agent returned a list of products. The user picks one or more; the agent receives the chosen ids and continues.",
  userSays: "Find me a laptop under $1500.",
  schema: {
    component: "card",
    id: "card-products",
    props: {
      title: "Pick the laptops you're interested in",
      description: "Multi-select; the agent will compare and recommend.",
      selectable: true,
      multi: true,
      items: [
        {
          id: "mbp14",
          title: "MacBook Pro 14\"",
          description: "M3 Pro, 18GB unified memory",
          meta: { price: "$1,499", battery: "18h", weight: "1.6 kg" },
        },
        {
          id: "tp14",
          title: "ThinkPad X1 Carbon Gen 12",
          description: "Intel Core Ultra 7, 32GB",
          meta: { price: "$1,449", battery: "15h", weight: "1.1 kg" },
        },
        {
          id: "dell13",
          title: "Dell XPS 13",
          description: "Snapdragon X Elite, 16GB",
          meta: { price: "$1,299", battery: "20h", weight: "1.2 kg" },
        },
        {
          id: "framework",
          title: "Framework Laptop 13",
          description: "AMD Ryzen 7, 16GB, fully repairable",
          meta: { price: "$1,399", battery: "10h", weight: "1.3 kg" },
        },
      ],
    },
  },
};
