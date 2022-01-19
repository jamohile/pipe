import type { node } from "./node";

/**
 * A pipe is another primitive, but a common one.
 * Pipes are a collection of two nodes: an input, and an output.
 * These are fairly representative (in an abstract sense) of many elements...
 * Resistors, Capacitors, etc.
 *
 * Having this abstraction lets us interact with them in interesting ways.
 */

/** A device that can accept an input. */
export interface inputtable {
  input: node;
}

/** A device that can accept an output. */
export interface outputtable {
  output: node;
}

/** A pipe has both an input and an output. */
export interface pipe extends inputtable, outputtable {}