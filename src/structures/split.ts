import { node } from "../core/node";
import { inputtable } from "../core/pipe";

/**
 * A split represents a point where a single node splits into multiple.
 * That is, several devices share an input.
 */

export function split(devices: inputtable[]): node {
  const n = new node();
  for (const d of devices) {
    n.connect(d.input);
  }
  return n;
}
