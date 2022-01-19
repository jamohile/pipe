import { node } from "./node/node";

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

export function isInputtable(object: any): object is inputtable {
  return "input" in object;
}

/** A device that can accept an output. */
export interface outputtable {
  output: node;
}

export function isOutputtable(object: any): object is outputtable {
  return "output" in object;
}

/** A pipe has both an input and an output. */
export interface pipe extends inputtable, outputtable {}

export function isPipe(object: any): object is pipe {
  return isInputtable(object) && isOutputtable(object);
}

/** Make a barebones pipe. */
export function make_pipe(): pipe {
  return { input: new node(), output: new node() };
}
