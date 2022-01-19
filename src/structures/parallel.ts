import { pipe } from "../core/pipe";
import { merge } from "./merge";
import { split } from "./split";

/** Connect these devices in parallel.
 *  That is, connect both their inputs and outputs.
 */
export function parallel(devices: pipe[]): pipe {
  return {
    input: split(devices),
    output: merge(devices),
  };
}
