import { node } from "../../core/node/node";
import { inputtable, make_pipe, pipe } from "../../core/pipe";
import { series } from "../series/series";

/** Connect the given devices in series, but looped around to the start.
 *  We pass in a function here, to allow passing in an exit node.
 *  This defines where the loop connects back out to the circuit.
 */

export function loop<D extends OneNodeLoopDevices | TwoNodeLoopDevices>(
  _devices: D
): Loop<D> {
  const output = make_pipe();

  const is_one_node = Array.isArray(_devices);

  let devices: pipe[];
  if (is_one_node) {
    devices = _devices as OneNodeLoopDevices;
  } else {
    devices = (_devices as TwoNodeLoopDevices)(output);
  }

  // Chain everything from start to end...
  series(...devices);

  // And loop around to the start.
  devices[devices.length - 1].output.connect(devices[0].input);

  if (is_one_node) {
    return devices[0].input as Loop<D>;
  }

  return {
    input: devices[0].input,
    output: output.output,
  } as Loop<D>;
}

/**
 * A loop has either one connection to the outside world, or two.
 * Regardless, it has an input in the form of the first device passed in.
 * To specify an output, though, a function can be passed in - loop will pass an output node here,
 * that can be placed where desired.
 */
export type LoopDevices = OneNodeLoopDevices | TwoNodeLoopDevices;
export type Loop<D extends LoopDevices> = D extends OneNodeLoopDevices
  ? node
  : pipe;

export type OneNodeLoopDevices = pipe[];
export type TwoNodeLoopDevices = (output: pipe) => pipe[];
