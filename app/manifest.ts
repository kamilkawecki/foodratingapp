import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Food Rating App",
    short_name: "FoodRating",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff7426",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
