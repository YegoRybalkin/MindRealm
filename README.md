# MindRealm

MindRealm is a spatial learning app built on the Method of Loci (the "memory palace" technique). You choose a place (Castle, House, Garden or Space Station), walk through its rooms, and attach the concepts you're studying to objects inside them. In Test Mode the labels disappear, and you click each object to recall the concept stored there.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

`npm run typecheck` runs the TypeScript compiler.

It needs no backend and no API keys. Data lives in the browser's `localStorage` and survives a refresh. The first time the app starts it seeds an example world, **Sociology Foundations**. You can delete it, and bring it back later from the empty state.

## Features

- **Dashboard.** Shows your worlds as cards (concept count, sections, last studied, mastery) plus four stats: concepts learned, recall accuracy, number of worlds and study streak.
- **Create world.** Pick one of four illustrated environments, then give it a name, and optionally a subject and a description.
- **Unique rooms.** Every room has its own wallpaper, a garden area's boundary counts as its wallpaper (picket fence, bamboo, brick with ivy and so on), and no two rooms in a world share one. Newly generated rooms always get a wall treatment that isn't used yet.
- **No look-alike objects.** Within a world, no two objects of the same kind look the same. The first chest keeps its original look; every other chest (including ones in generated rooms and inside containers) gets its own recolour, surface pattern (spots, stripes, checks, stars, marble…) and proportions, plus a matching name such as "Spotted Chest" or "Tall Striped Wardrobe". Looks are also varied within each room and stored on each object, so they never change later.
- **Openable containers.** Wardrobes, bookshelves, chests, the fridge, toolbox, potting tray, locker and medkit open into a close-up scene of smaller objects, and each smaller object can hold its own concept. The container itself can hold one too. Test mode, search, bulk add and the world map all include what's inside.
- **World view.** A full-screen scene in which each object can be clicked. You move between sections with the ← → edge arrows, the arrow keys or the section dots. On portrait phones the scene pans sideways instead of shrinking, so the layout stays the same.
- **Concepts.** Each concept has a title, a description, an optional example and optional notes. Click an object to add, view, edit or delete its concept. Deleting asks for confirmation, and every change saves automatically.
- **Generate Section.** Adds the next section for the environment from its template pool. When the pool runs out, it creates mirrored and re-toned variants ("Module B Airlock"), so a world can keep growing.
- **World Map.** Shows every section with its concept count and mastery. From it you can jump to, rename or delete a section, or generate a new one.
- **Test Mode.** You can test the whole world, the current section, or your weak concepts. Answer matching ignores case, punctuation and leading articles, and tolerates small typos. Objects you've answered show ✓ or ✗ without revealing the concept.
- **Results.** Shows your score, accuracy and a per-section breakdown. From there you can review mistakes (with "Show in world"), retest them, test again or return to the world.
- **Mastery.** Mastery is `correct / total`, shown as four levels: New, Learning, Familiar and Mastered.
- **Search.** Press ⌘K / Ctrl+K or `/`. A result shows its full path (World → Environment → Section → Object), and opening it takes you to that section and highlights the object.
- **Bulk add.** Paste `Term: definition` lines and each concept is placed on the next free object. New sections are generated when the world runs out of room.

## Architecture

```
src/
  app/                      Next.js App Router (dashboard, /worlds/[worldId])
  environments/             Data-driven environment templates (castle, house, garden, spaceStation)
  components/
    scene/                  Rendering: SVG backdrops, object illustrations (art/), previews
    world/                  MemoryWorld, SectionView, InteractiveObject, ConceptPanel, NavigationControls, …
    test/                   TestSetupDialog, TestQuestion, TestHud, TestResults, ReviewMistakes
    map/ search/ dashboard/ Feature components
    ui/                     shadcn-style primitives (Radix + Tailwind)
  lib/
    types.ts                World → Section → Object → Concept model
    terminology.ts          Central product vocabulary (rename "Memory World", "Section", … here)
    domain/                 Pure business logic: world ops, mastery, matching, tests, search, placement
    generation/             SectionGenerator interface + template implementation
    persistence/            MemoryRepository interface + localStorage implementation
    store/                  React context that connects the UI, domain logic and persistence
    ai/contracts.ts         Interfaces for future AI features (not called anywhere yet)
```

### Adding an environment

1. Create `src/environments/<name>.ts` exporting an `EnvironmentTemplate`. It lists sections, and each section has a backdrop spec and objects with `x`, `y` and `size` given as percentages of the scene.
2. Register it in `src/environments/index.ts`.
3. To make an object openable, give it `interior: "<key>"` and define that close-up in `src/environments/interiors.ts`. Give each section a wallpaper with `...wp(pattern, a, b, c)` in its backdrop options, and list spare wallpapers in `wallpaperPool` for generated rooms.
4. If it needs new visuals, add object illustrations to `src/components/scene/art/` and, optionally, a backdrop renderer in `src/components/scene/backdrops.tsx`.

Worlds saved by older versions are upgraded when they load (`src/lib/domain/migrate.ts`): they gain wallpapers, container contents and distinct looks for repeated objects, and no existing object or concept moves.

A section stores a copy of its object positions when it is created. Editing a template later therefore never moves the objects in existing worlds, and each concept stays on the same object in the same place.

### Replacing localStorage with Supabase

Implement `MemoryRepository` (`src/lib/persistence/repository.ts`) and return the new class from `createRepository()`. The UI does not need to change.

### Future AI hooks

- `SectionGenerator` (`src/lib/generation/types.ts`): add an AI-backed implementation and swap it in at `src/lib/generation/index.ts`.
- `placeConcepts()` (`src/lib/domain/placement.ts`): attaches a list of concepts to objects and generates sections as needed. "Bulk add" already uses it, and a future notes-to-palace pipeline can use it the same way.
- `src/lib/ai/contracts.ts` documents the planned interfaces: extracting concepts from notes, matching concepts to objects, mnemonic stories and quiz generation.
- `Concept.review` is reserved for a spaced-repetition scheduler. `applyReviewResult()` in `lib/domain/mastery.ts` is the single place where a review result is applied.
