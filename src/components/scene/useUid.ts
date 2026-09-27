import { useId } from "react";

/** useId sanitized for use inside SVG url(#…) references. */
export function useUid(prefix = "u") {
  return prefix + useId().replace(/[^a-zA-Z0-9]/g, "");
}
