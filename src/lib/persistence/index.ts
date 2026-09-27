import { LocalStorageRepository } from "./localStorageRepository";
import type { MemoryRepository } from "./repository";

/** Single place to choose the storage backend (e.g. a SupabaseRepository later). */
export function createRepository(): MemoryRepository {
  return new LocalStorageRepository();
}

export type { MemoryRepository };
