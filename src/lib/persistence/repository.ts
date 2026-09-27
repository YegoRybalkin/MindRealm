import type { Profile, World } from "@/lib/types";

/**
 * Storage abstraction. The UI only talks to this interface (through the store),
 * so localStorage can be replaced by Supabase/PostgreSQL with a new implementation.
 */
export interface MemoryRepository {
  listWorlds(): Promise<World[]>;
  saveWorld(world: World): Promise<void>;
  deleteWorld(id: string): Promise<void>;
  loadProfile(): Promise<Profile>;
  saveProfile(profile: Profile): Promise<void>;
}
