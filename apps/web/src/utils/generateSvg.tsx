import satori from "satori";

import OgSvg from "@/components/OgSvg";

const generateSvg = async (title: string) => {
  const robotoArrayBuffer = await fetch(
    "https://github.com/googlefonts/roboto/raw/main/src/hinted/Roboto-Regular.ttf",
  ).then((res) => res.arrayBuffer());

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

export default generateSvg;
