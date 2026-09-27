import { getArt } from "@/components/scene/art";
import type { InteriorTemplate, ObjectTemplate } from "./types";
import { obj } from "./helpers";

/**
 * Close-up scenes for openable containers. Each container in a section template
 * references one of these by key. Every interior is unique so each place stays distinct.
 */

/** Shelf surfaces (in % of scene height) matching the default interior-shelf layout. */
const S1 = 33.3;
const S2 = 62.2;
const S3 = 91.1;

/** Hanging item: its top sits on the wardrobe rail (22%), so derive the bottom from its art. */
function hang(key: string, name: string, visualType: string, x: number, size: number): ObjectTemplate {
  const art = getArt(visualType);
  const ratio = art ? art.h / art.w : 1.4;
  const y = Math.round((22 + size * ratio * (16 / 9)) * 10) / 10;
  return obj(key, name, visualType, x, y, size);
}

/** Lay out six items in a 3×2 grid (top-down close-ups: tables, crates, drawers…). */
type Item = [key: string, name: string, visualType: string, size: number];
function grid(items: Item[], rows: [number, number] = [46, 86], cols: number[] = [22, 50, 78]): ObjectTemplate[] {
  return items.map(([key, name, visualType, size], i) => obj(key, name, visualType, cols[i % cols.length], rows[Math.floor(i / cols.length)] ?? rows[1], size));
}

export const INTERIORS: Record<string, InteriorTemplate> = {
  /* ------------------------------ castle ------------------------------ */
  "castle-library-bookshelf": {
    title: "Inside the Bookshelf",
    background: { kind: "interior-shelf", options: { wood: "#5e3c27", back: "#2a1a10", glow: "#ffc466", wp: "pinstripe", wpA: "#2a1a10", wpB: "#3a2616", wpC: "#3a2616" } },
    objects: [
      obj("tome", "Ancient Tome", "tome", 22, S1, 17),
      obj("scroll", "Sealed Scroll", "scroll", 50, S1, 18),
      obj("hourglass", "Hourglass", "hourglass", 78, S1, 8),
      obj("quill", "Quill & Inkwell", "quill", 30, S2, 10.5),
      obj("herbs", "Herb Jar", "herb-jar", 68, S2, 9),
      obj("key", "Brass Key", "key", 30, S3, 15.5),
      obj("starmap", "Star Map", "star-map", 70, S3, 14.5),
    ],
  },
  "castle-tower-potions": {
    title: "Inside the Potion Shelf",
    background: { kind: "interior-shelf", options: { wood: "#4a2e1a", back: "#1e1830", glow: "#a77bff", wp: "stars", wpA: "#1e1830", wpB: "#2e2548", wpC: "#3a2f5a" } },
    objects: [
      obj("round", "Green Elixir", "flask-round", 24, S1, 10.5),
      obj("tall", "Red Tincture", "flask-tall", 50, S1, 8),
      obj("crystal", "Blue Crystal", "crystal", 76, S1, 10.5),
      obj("mushrooms", "Mushroom Jar", "mushroom-jar", 30, S2, 10.5),
      obj("vials", "Vial Rack", "vial", 70, S2, 13),
      obj("mortar", "Mortar & Pestle", "mortar", 30, S3, 14.5),
      obj("herbs", "Dried Herbs", "herb-bundle", 70, 88, 9),
    ],
  },
  "castle-treasury-chest": {
    title: "Inside the Treasure Chest",
    background: { kind: "interior-case", options: { shell: "#6b4428", lining: "#6d1a26", trim: "#d6a84a" } },
    objects: [
      obj("ring", "Ruby Ring", "ring", 22, 42, 10.5),
      obj("necklace", "Sapphire Necklace", "necklace", 48, 44, 17),
      obj("tiara", "Tiara", "tiara", 77, 42, 17),
      obj("dagger", "Jewelled Dagger", "dagger", 26, 72, 21),
      obj("pouch", "Coin Pouch", "pouch", 55, 76, 13),
      obj("scepter", "Scepter", "scepter", 80, 76, 22),
    ],
  },
  "castle-entrance-chest": {
    title: "Inside the Travel Chest",
    background: { kind: "interior-case", options: { shell: "#7a5130", lining: "#34503f", trim: "#8a929a" } },
    objects: [
      obj("cloak", "Folded Cloak", "cloak", 24, 46, 19.5),
      obj("map", "Road Map", "map", 52, 44, 18),
      obj("compass", "Compass", "compass", 78, 42, 10.5),
      obj("boots", "Riding Boots", "boots", 24, 82, 17),
      obj("waterskin", "Waterskin", "waterskin", 52, 82, 11.5),
      obj("rope", "Coil of Rope", "rope", 78, 82, 15.5),
    ],
  },

  /* ------------------------------ house ------------------------------ */
  "house-bedroom-wardrobe": {
    title: "Inside the Wardrobe",
    background: { kind: "interior-wardrobe", options: { wood: "#c89b6d", back: "#efe6da", wp: "herringbone", wpA: "#efe6da", wpB: "#e4d8c6", wpC: "#d8cab4" } },
    objects: [
      obj("hat", "Felt Hat", "hat", 30, 14.4, 13),
      hang("shirt", "White Shirt", "shirt", 20, 14.5),
      hang("dress", "Red Dress", "dress", 35, 14.5),
      hang("coat", "Trench Coat", "coat", 51, 17),
      hang("sweater", "Knit Sweater", "sweater", 67, 15.5),
      hang("scarf", "Striped Scarf", "scarf", 81, 8),
      obj("sneakers", "Sneakers", "sneakers", 30, 91.8, 15.5),
      obj("handbag", "Handbag", "handbag", 70, 91.8, 11.5),
    ],
  },
  "house-kitchen-fridge": {
    title: "Inside the Fridge",
    background: { kind: "interior-shelf", options: { style: "fridge" } },
    objects: [
      obj("milk", "Milk Carton", "milk", 24, S1, 7),
      obj("juice", "Orange Juice", "juice", 50, S1, 7),
      obj("jam", "Strawberry Jam", "jam", 76, S1, 8.5),
      obj("cheese", "Cheese Wedge", "cheese", 30, S2, 13),
      obj("cake", "Birthday Cake", "cake", 68, S2, 14.5),
      obj("eggs", "Egg Tray", "eggs", 22, S3, 14.5),
      obj("carrots", "Carrots", "carrots", 50, S3, 14.5),
      obj("melon", "Watermelon Slice", "melon", 78, S3, 14.5),
    ],
  },
  "house-office-bookshelf": {
    title: "On the Office Shelves",
    background: { kind: "interior-shelf", options: { wood: "#c89b6d", back: "#e8e0d2", wp: "grid", wpA: "#e8e0d2", wpB: "#ddd3c2", wpC: "#cfc3ad" } },
    objects: [
      obj("books", "Stack of Books", "book-stack", 24, S1, 14.5),
      obj("trophy", "Trophy", "trophy", 52, S1, 10.5),
      obj("photo", "Family Photo", "photo-frame", 78, S1, 10.5),
      obj("camera", "Camera", "camera", 30, S2, 14.5),
      obj("headphones", "Headphones", "headphones", 68, S2, 13),
      obj("cactus", "Little Cactus", "cactus", 30, S3, 8),
      obj("piggy", "Piggy Bank", "piggy-bank", 68, S3, 14.5),
    ],
  },
  "house-garage-toolbox": {
    title: "Inside the Toolbox",
    background: { kind: "interior-case", options: { shell: "#c7412f", lining: "#2a2d31", trim: "#9aa1a8", table: "#5d5b57" } },
    objects: [
      obj("hammer", "Hammer", "hammer", 28, 40, 23.5),
      obj("wrench", "Wrench", "wrench", 70, 40, 23.5),
      obj("screwdriver", "Screwdriver", "screwdriver", 28, 62, 23.5),
      obj("pliers", "Pliers", "pliers", 70, 64, 22),
      obj("saw", "Hand Saw", "saw", 32, 86, 26),
      obj("tape", "Tape Measure", "tape-measure", 72, 88, 13),
    ],
  },

  /* ------------------------------ garden ------------------------------ */
  "garden-greenhouse-bench": {
    title: "On the Potting Bench",
    background: { kind: "interior-bench", options: { board: "#c8b996", wood: "#9c7148" } },
    objects: [
      obj("pot", "Clay Pot", "clay-pot", 20, 72, 11.5),
      obj("packet", "Seed Packet", "seed-packet", 42, 70, 9),
      obj("twine", "Garden Twine", "twine", 64, 70, 9),
      obj("trowel", "Trowel", "trowel", 26, 94, 21),
      obj("gloves", "Gardening Gloves", "gloves", 54, 96, 15.5),
      obj("shears", "Pruning Shears", "shears", 80, 94, 19.5),
    ],
  },

  /* --------------------------- space station --------------------------- */
  "station-quarters-locker": {
    title: "Inside the Locker",
    background: { kind: "interior-shelf", options: { style: "metal", wood: "#8e98a6", back: "#2a3342", glow: "#5ce1e6", wp: "grid", wpA: "#2a3342", wpB: "#34405a", wpC: "#3e4c66" } },
    objects: [
      obj("helmet", "Flight Helmet", "space-helmet", 30, S1, 14.5),
      obj("mug", "Crew Mug", "mug", 68, S1, 8),
      obj("tablet", "Data Tablet", "tablet", 30, S2, 10.5),
      obj("photo", "Photo from Home", "photo-frame", 68, S2, 9),
      obj("headphones", "Headphones", "headphones", 30, S3, 13),
      obj("badge", "Mission Badge", "badge", 68, S3, 8),
    ],
  },
  "station-medbay-medkit": {
    title: "Inside the Medkit",
    background: { kind: "interior-case", options: { shell: "#eef1f4", lining: "#b9c3cf", trim: "#ff5c6c", table: "#1b2230" } },
    objects: [
      obj("pills", "Pill Bottle", "pills", 22, 48, 7),
      obj("syringe", "Syringe", "syringe", 50, 42, 23.5),
      obj("ampoules", "Ampoules", "ampoule", 78, 48, 10.5),
      obj("bandage", "Bandage Roll", "bandage", 22, 84, 11.5),
      obj("thermometer", "Thermometer", "thermometer", 50, 76, 22),
      obj("stethoscope", "Stethoscope", "stethoscope", 78, 86, 14.5),
    ],
  },
  /* ------------------------ second wave: castle ------------------------ */
  "castle-greathall-table": {
    title: "The Feast on the Table",
    background: { kind: "interior-table", options: { wood: "#5a3a24", cloth: "#efe4cc", trim: "#8e2433" } },
    objects: grid([
      ["roast", "Roast Chicken", "roast", 18],
      ["bread", "Loaf of Bread", "bread", 15],
      ["grapes", "Bunch of Grapes", "grapes", 9],
      ["pie", "Berry Pie", "pie", 15],
      ["jug", "Wine Jug", "jug", 9],
      ["cheese", "Cheese Wheel", "cheese", 13],
    ]),
  },
  "castle-armory-barrel": {
    title: "Inside the Barrel",
    background: { kind: "interior-crate", options: { wood: "#6b4428", fill: "straw", round: true } },
    objects: grid([
      ["arrows", "Bundle of Arrows", "arrows", 9],
      ["mace", "Spiked Mace", "mace", 7],
      ["gauntlet", "Iron Gauntlet", "gauntlet", 10],
      ["horn", "War Horn", "horn", 15],
      ["whetstone", "Whetstone", "whetstone", 14],
      ["chainmail", "Chainmail Shirt", "chainmail", 12],
    ], [48, 84], [28, 50, 72]),
  },
  "castle-courtyard-cart": {
    title: "In the Hay Cart",
    background: { kind: "interior-crate", options: { wood: "#8a5f3c", fill: "straw" } },
    objects: grid([
      ["sack", "Grain Sack", "grain-sack", 10],
      ["pumpkin", "Pumpkin", "pumpkin", 13],
      ["cabbage", "Cabbage", "cabbage", 11],
      ["horseshoe", "Lucky Horseshoe", "horseshoe", 10],
      ["pail", "Milk Pail", "milk-pail", 10],
      ["turnips", "Turnips", "turnips", 14],
    ]),
  },
  "castle-chapel-altar": {
    title: "Inside the Reliquary",
    background: { kind: "interior-case", options: { shell: "#d9d1c4", lining: "#4a2a6a", trim: "#d6a84a", table: "#2a2230" } },
    objects: grid([
      ["rosary", "Rosary", "rosary", 11],
      ["censer", "Censer", "censer", 8],
      ["book", "Prayer Book", "prayer-book", 14],
      ["chalice", "Chalice", "goblet", 6],
      ["relic", "Relic Box", "relic-box", 12],
      ["feather", "White Feather", "feather", 14],
    ], [48, 82]),
  },

  /* ------------------------ second wave: house ------------------------ */
  "house-entrance-drawer": {
    title: "Inside the Console Drawer",
    background: { kind: "interior-drawer", options: { wood: "#8a5a3b", felt: "#2f4863" } },
    objects: [
      obj("wallet", "Wallet", "wallet", 28, 30, 12),
      obj("sunglasses", "Sunglasses", "sunglasses", 72, 28, 15),
      obj("envelopes", "Letters", "envelopes", 28, 56, 13),
      obj("phone", "Old Phone", "phone", 72, 60, 6),
      obj("keys", "House Keys", "key", 28, 84, 14),
      obj("lipstick", "Lipstick", "lipstick", 72, 90, 4.5),
    ],
  },
  "house-living-coffeetable": {
    title: "Inside the Coffee Table Drawer",
    background: { kind: "interior-drawer", options: { wood: "#6b4428", felt: "#7a2e3a" } },
    objects: [
      obj("dice", "Pair of Dice", "dice", 28, 30, 11),
      obj("knight", "Chess Knight", "chess-knight", 72, 34, 6),
      obj("cards", "Playing Cards", "cards", 28, 60, 12),
      obj("puzzle", "Puzzle Piece", "puzzle", 72, 58, 10),
      obj("remote", "TV Remote", "remote", 28, 92, 4.5),
      obj("candle", "Scented Candle", "candle-jar", 72, 90, 8),
    ],
  },
  "house-bathroom-mirror": {
    title: "Inside the Mirror Cabinet",
    background: { kind: "interior-shelf", options: { style: "glass" } },
    objects: [
      obj("toothbrush", "Toothbrush", "toothbrush", 24, S1, 4),
      obj("paste", "Toothpaste", "toothpaste", 52, S1, 14),
      obj("soap", "Bar of Soap", "soap", 78, S1, 10),
      obj("perfume", "Perfume", "perfume", 30, S2, 7),
      obj("comb", "Comb", "comb", 68, S2, 14),
      obj("lotion", "Lotion", "lotion", 50, S3, 5),
    ],
  },

  /* ------------------------ second wave: garden ------------------------ */
  "garden-entrance-birdhouse": {
    title: "Inside the Birdhouse",
    background: { kind: "interior-nest", options: {} },
    objects: grid([
      ["eggs", "Blue Eggs", "bird-eggs", 12],
      ["feather", "Soft Feather", "feather", 14],
      ["acorn", "Acorn", "acorn", 7],
      ["snail", "Snail", "snail", 12],
      ["berries", "Berries", "berries", 11],
      ["button", "Shiny Button", "button", 7],
    ], [48, 80], [30, 50, 70]),
  },
  "garden-fountain-basin": {
    title: "Beneath the Fountain",
    background: { kind: "interior-water", options: { top: "#8fd3ea", deep: "#2a6f95", floor: "#d9cfb4" } },
    objects: [
      obj("goldfish", "Goldfish", "goldfish", 26, 34, 13),
      obj("coin", "Wishing Coin", "wish-coin", 54, 40, 7),
      obj("bottle", "Message in a Bottle", "message-bottle", 80, 30, 15),
      obj("turtle", "Turtle", "turtle", 30, 64, 14),
      obj("lily", "Water Lily", "lily-flower", 72, 60, 12),
      obj("pebbles", "Pebbles", "pebbles", 52, 93, 14),
    ],
  },
  "garden-rose-beehive": {
    title: "Inside the Beehive",
    background: { kind: "interior-hive", options: {} },
    objects: [
      obj("bee", "Worker Bee", "bee", 22, 32, 11),
      obj("queen", "Queen Bee", "queen-bee", 52, 30, 13),
      obj("jar", "Honey Jar", "honey-jar", 80, 44, 8),
      obj("dipper", "Honey Dipper", "honey-dipper", 26, 64, 15),
      obj("comb", "Honeycomb", "honeycomb", 56, 84, 13),
      obj("candle", "Beeswax Candle", "wax-candle", 82, 88, 5),
    ],
  },
  "garden-pond-rowboat": {
    title: "In the Rowboat",
    background: { kind: "interior-crate", options: { wood: "#7a4e30", fill: "boards" } },
    objects: grid([
      ["rod", "Fishing Rod", "fishing-rod", 18],
      ["net", "Fishing Net", "net", 13],
      ["ring", "Life Ring", "life-ring", 10],
      ["bait", "Bait Tin", "bait-tin", 10],
      ["fish", "Silver Fish", "caught-fish", 15],
      ["lantern", "Boat Lantern", "lantern", 6],
    ]),
  },
  "garden-statue-urn": {
    title: "Inside the Stone Urn",
    background: { kind: "interior-crate", options: { wood: "#a79f90", fill: "boards", round: true } },
    objects: grid([
      ["laurel", "Laurel Wreath", "laurel", 13],
      ["hand", "Marble Hand", "marble-hand", 8],
      ["mosaic", "Mosaic Tile", "mosaic", 10],
      ["lamp", "Oil Lamp", "oil-lamp", 14],
      ["amphora", "Amphora", "amphora", 7],
      ["scroll", "Ancient Scroll", "scroll", 13],
    ], [48, 84], [30, 50, 70]),
  },
  "garden-orchard-basket": {
    title: "In the Fruit Basket",
    background: { kind: "interior-crate", options: { fill: "weave", round: true, wood: "#9c6a3a" } },
    objects: grid([
      ["pear", "Pear", "pear", 7],
      ["plum", "Plum", "plum", 7],
      ["cherries", "Cherries", "cherries", 8],
      ["peach", "Peach", "peach", 8],
      ["lemon", "Lemon", "lemon", 10],
      ["apple", "Green Apple", "green-apple", 8],
    ], [48, 80], [32, 50, 68]),
  },

  /* ------------------------ second wave: station ------------------------ */
  "station-airlock-kit": {
    title: "Inside the Emergency Kit",
    background: { kind: "interior-case", options: { shell: "#ff9f43", lining: "#2a3342", trim: "#ffd166", table: "#1b2230" } },
    objects: grid([
      ["flare", "Signal Flare", "flare", 16],
      ["ration", "Ration Pack", "ration", 12],
      ["flashlight", "Flashlight", "flashlight", 16],
      ["mask", "Oxygen Mask", "oxygen-mask", 10],
      ["tape", "Repair Tape", "repair-tape", 9],
      ["rope", "Tether Line", "rope", 12],
    ], [48, 84]),
  },
  "station-command-archive": {
    title: "The Console Archive",
    background: { kind: "interior-holo", options: { color: "#5ce1e6" } },
    objects: grid([
      ["galaxy", "Galaxy Map", "holo-galaxy", 12],
      ["comet", "Comet Track", "holo-comet", 12],
      ["ship", "Ship Schematic", "holo-ship", 12],
      ["moon", "Moon Survey", "holo-moon", 12],
      ["sun", "Star Profile", "holo-sun", 12],
      ["asteroid", "Asteroid Scan", "holo-asteroid", 12],
    ], [44, 88]),
  },
  "station-lab-tank": {
    title: "Inside the Specimen Tank",
    background: { kind: "interior-water", options: { top: "#3fbf7a", deep: "#0f3a2a", floor: "#2a3342" } },
    objects: [
      obj("jelly", "Glow Jellyfish", "jellyfish", 24, 46, 9),
      obj("egg", "Alien Egg", "alien-egg", 52, 50, 7),
      obj("microbe", "Giant Microbe", "microbe", 80, 34, 11),
      obj("spores", "Spore Pod", "spore-pod", 26, 92, 8),
      obj("tentacle", "Tentacle Plant", "tentacle-plant", 56, 94, 9),
      obj("crystal", "Bio Crystal", "crystal", 80, 94, 8),
    ],
  },
  "station-engine-parts": {
    title: "Inside the Parts Case",
    background: { kind: "interior-case", options: { shell: "#9aa4b2", lining: "#3a2e2a", trim: "#ff9f43", table: "#1b1c20" } },
    objects: grid([
      ["gear", "Big Gear", "gear", 10],
      ["bolt", "Hex Bolt", "bolt", 14],
      ["board", "Circuit Board", "circuit-board", 13],
      ["battery", "Power Cell", "battery", 6],
      ["fuse", "Fuse", "fuse", 14],
      ["spring", "Coil Spring", "spring", 6],
    ], [48, 84]),
  },
  "station-observation-archive": {
    title: "The Satellite Archive",
    background: { kind: "interior-holo", options: { color: "#c77dff" } },
    objects: grid([
      ["rock", "Moon Rock", "moon-rock", 12],
      ["rocket", "Rocket Model", "rocket-model", 6],
      ["astronaut", "Astronaut Figure", "astronaut-toy", 7],
      ["meteorite", "Meteorite", "meteorite", 12],
      ["badge", "Mission Patch", "badge", 7],
      ["chart", "Star Chart", "star-map", 12],
    ], [44, 88]),
  },
};

export function getInterior(key: string): InteriorTemplate | undefined {
  return INTERIORS[key];
}
