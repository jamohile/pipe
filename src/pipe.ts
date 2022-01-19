import type { node } from "./node";

/**
 * A pipe is another primitive, but a common one.
 * Pipes are a collection of two nodes: an input, and an output.
 * These are fairly representative (in an abstract sense) of many elements...
 * Resistors, Capacitors, etc.
 *
 * Having this abstraction lets us interact with them in interesting ways.
 */
export interface pipe {
  input: node;
  output: node;
}
