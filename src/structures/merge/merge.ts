import { node } from "../../core/node/node";
import { outputtable } from "../../core/pipe";
import { connect } from "../connect/connect";

/**
 * A merge represents multiple devices whose outputs are combined.
 */

export function merge(...devices: outputtable[]): node {
  return connect(...devices.map((d) => d.output));
}
