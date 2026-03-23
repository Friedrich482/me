import satori from "satori";

import { OgSvg } from "../components/og-svg";

export const generateSvg = async (title: string) => {
  const response = await fetch(
    "https://github.com/googlefonts/roboto/raw/main/src/hinted/Roboto-Regular.ttf",
  );

  const robotoArrayBuffer = await response.arrayBuffer();

  const svg = await satori(<OgSvg title={title} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Roboto",
        data: robotoArrayBuffer,
        weight: 400,
        style: "normal",
      },
    ],
  });

  return svg;
};
