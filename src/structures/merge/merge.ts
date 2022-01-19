import { node } from "../../core/node/node";
import { outputtable } from "../../core/pipe";

/**
 * A merge represents multiple devices whose outputs are combined.
 */

export function merge(...devices: outputtable[]): node {
  const n = new node();
  for (const d of devices) {
    n.connect(d.output);
  }
  return n;
}
