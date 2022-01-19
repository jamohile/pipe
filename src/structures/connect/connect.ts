import { node } from "../../core/node/node";

/**
 * Connect together a series of nodes.
 */
export function connect(...nodes: node[]): node {
  const connected = new node();
  for (const n of nodes) {
    connected.connect(n);
  }
  return connected;
}
