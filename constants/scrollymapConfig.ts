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
      'Named after the tea jassid, an insect whose bites provide the fruity notes of Oriental Beauty and Red Oolong, Jassid Tea House offers a large selection of Taiwanese teas. Freshly brewed loose-leaf teas are often half the price of teahouses in other areas of Taipei, making it easy to sample multiple tea types with a small group of friends. Each tea can be re-steeped at least once, encouraging long conversations with friends. The tea drinking experience here is best summarized by a simple piece of Chinese calligraphy hanging on the teahouse walls, 今天無事, or "Nothing to do today"',
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

export type ScrollyMapConfig = {
  title: string;
  description: string;
  places: Place[];
};

export const config = {
  title: "Taiwan Teahouses",
  description: `  
  Many flock to Taipei’s myriad bubble tea shops, but few slow down to enjoy a freshly steeped cup of Taiwanese loose-leaf tea. Unlike bubble tea, whose tea flavors can be masked by a heavy dose of milk, sugar, and dizzying array of toppings, loose-leaf tea extracts all its natural, aromatic flavors by simply infusing premium, hand-picked tea leaves in hot water.

    Folks used to over-brewed tea bag tea may find the range of flavors released by premium loose-leaf tea surprising. Taiwan’s ruby red tea is classified as a black tea, but releases sweeter and fruitier flavors than its western counterparts. High mountain oolong is floral and creamy. Oriental Beauty and red oolong, blessed by the bites of Jassid tea bugs, release a distinctive honey flavor. Roasted teas offer a toasty flavor perfect for keeping warm in the winter months. 
    
    To extract the best flavors, most teahouses prepare tea following the traditional gongfu style. Compared with western-style brewing, this process uses a smaller clay teapot, a large amount of tea leaves, and shorter steeping times. Each steeping is savored on its own, and premium tea leaves can endure five or more steepings before its flavor begins to diminish. Tea enthusiasts enjoy tasting the different aromatics that the tea leaves release with each steeping. 
    
    Given the lengthy process, some teahouses have streamlined the ritual, combining multiple steepings into a single cup for immediate consumption. Other teahouses offer aspiring tea enthusiasts the tools and guidance needed to embark on their own tea steeping journey. Though daunting at first, steeping high quality leaves is a forgiving process. The quality of tea leaves can mask any mistakes one might make as a novice tea steeper. And while tea aficionados enjoy debating the ideal water temperature, brewing time, and steeping vessels to extract the best flavors, much of the joy in tea drinking is a journey of self-discovery - finding one’s favorite teas and perfecting the processes that best extract its flavors. 
    
    Because tea steeping is a relaxed process, teahouses offer a variety of environments. Some are more suitable for enjoying tea solo while others are conducive to sampling a variety of teas over a lively conversation. Regardless of one’s preference, these are a few of the best spaces to relax, savor a cup of loose-leaf tea, and begin a journey into Taiwan’s loose-leaf tea. 
  `,
  places,
};
