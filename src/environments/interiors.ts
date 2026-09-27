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
};

export function getInterior(key: string): InteriorTemplate | undefined {
  return INTERIORS[key];
}
