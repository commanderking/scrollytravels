export type Place = {
  id: string;
  description: string;
  title: string;
  website: string;
  googleMapLink: string;
  coordinates: [number, number];
};

const places: Place[] = [
  {
    id: "jth",
    description:
      'Named after the tea jassid, an insect whose bites provide the fruity notes of Oriental Beauty and Red Oolong, Jassid Tea House offers a large selection of Taiwanese teas. Freshly brewed teas are affordably priced, making it easy to sample multiple tea types with a small group of friends. Each tea can be re-steeped at least once, encouraging long conversations with friends or a lazy day reading a new book. The tea drinking experience here is best summarized by a simple piece of Chinese calligraphy hanging on the teahouse walls, 今天無事, or "Nothing to do today"',
    website: "https://www.jassidteahouse.com/",
    googleMapLink: "https://maps.app.goo.gl/aAacgAD8R1RXkKby9",
    title: "Jassid Tea House",
    coordinates: [121.555204, 25.038152],
  },
  {
    id: "jsy",
    description:
      "For first time tea drinkers, Jing Sheng Yu offers an approachable gateway to the world of Taiwanese tea. On some days, they offer free tea bag brews on a wide variety of Taiwanese teas. Feel free to try one, but for a more authentic tasting, opt to order a freshly brewed cup of tea. Jing Sheng Yu's process, which can be viewed by sitting at the bar of their modern shop, involves using traditional Chinese Zisha clay teapots to steep the tea three times. While traditionally, a tea drinker would enjoy each steep at a time, at Jing Sheng Yu, they'll pour all three brews into one mug so you can taste a balanced version of the tea. On your way out, grab a cold brew bottle of a second tea flavor., which comes packaged in a distinctive tall cylinder.",
    website: "https://www.jsy-tea.com/",
    googleMapLink: "https://maps.app.goo.gl/wQHSUoinEKYXWEba9",
    title: "Jing Sheng Yu",
    coordinates: [121.52923069550262, 25.032385868672776],
  },
  {
    id: "sbt",
    description:
      "Run by a husband and wife, Stop By Teahouse offers visitors a chance to brew their own pots of tea in the traditional gongfu style. If you're unsure what to do, the owner will provide you some basic instructions. Nervous about ruining your tea? They also offer to brew your selected tea in the traditional way and pour all brews into one cup to drink so you can enjoy a balanced version of the tea without the hassle. ",
    website: "https://www.facebook.com/stopbyteahouse/",
    googleMapLink: "https://maps.app.goo.gl/cEBxqmSmNwqt4rM9A",
    title: "Stop By Teahouse",
    coordinates: [121.52922476548716, 25.0302556757552],
  },
  {
    id: "lcg",
    description:
      "Whereas many of the other tea shops in the Dongmen area cater to visitors experiencing Taiwanese tea culture for the first time, Old Tea Can almost always is filled with locals who bring their own tea and pay the 100 NT per person fee in exchange for a cozy gathering space and use of their many tea sets. If you don't have your own tea, they sell small bags of a wide variety of Taiwanese teas on the first floor, which you can then take to the second floor to brew on your own. There's no hand holding here. At each table, you'll find a water kettle, a tea pot of Gaiwan, and a number of teacups available for you to entertain yourself and any number of guests you've invited.",
    website: "",
    googleMapLink: "",
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
