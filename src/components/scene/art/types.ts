import type { ReactNode } from "react";

export interface ArtDef {
  /** viewBox width */
  w: number;
  /** viewBox height; the object "stands" on y = h */
  h: number;
  /** Renders SVG children. `u` is a unique id prefix for gradients/filters. */
  render: (u: string) => ReactNode;
  /** Whether the object sits on the floor (gets a contact shadow). Defaults to true. */
  grounded?: boolean;
}
