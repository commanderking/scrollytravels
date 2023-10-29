export type Place = {
  id: string;
  description: string;
  title: string;
  coordinates: [number, number];
};

const places: Place[] = [
  {
    id: "jth",
    description: "Hoho! It's Jassid Tea House!",
    title: "Jassid Tea House",
    coordinates: [121.555204, 25.038152],
  },
  {
    id: "jsy",
    description: "Hoho! It's Jing Sheng Yu!",
    title: "Jing Sheng Yu",
    coordinates: [121.52923069550262, 25.032385868672776],
  },
  {
    id: "sbt",
    description: "Hoho! It's Stop By Teahouse!",
    title: "Stop By Teahouse",
    coordinates: [121.52922476548716, 25.0302556757552],
  },
  {
    id: "lcg",
    description: "Old tea house",
    title: "老茶罐 (Old Tea Can)",
    coordinates: [121.52963879264816, 25.030005491295665],
  },
];

export const config = {
  title: "Taiwan Teahouses",
  places,
};

export type ScrollyMapConfig = {
  title: string;
  places: Place[];
};
