import { node } from "../../core/node/node";
import { inputtable } from "../../core/pipe";
import { connect } from "../connect/connect";

/**
 * A split represents a point where a single node splits into multiple.
 * That is, several devices share an input.
 */

export function split(...devices: inputtable[]): node {
  return connect(...devices.map((d) => d.input));
}
