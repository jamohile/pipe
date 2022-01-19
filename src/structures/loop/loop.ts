import { make_pipe, pipe } from "../../core/pipe";
import { series } from "../series";

/** Connect the given devices in series, but looped around to the start.
 *  We pass in a function here, to allow passing in an exit node.
 *  This defines where the loop connects back out to the circuit.
 */
export function loop(get_devices: (output: pipe) => pipe[]): pipe {
  const output = make_pipe();
  const devices = get_devices(output);

  // Chain everything from start to end...
  series(...devices);

  // And loop around to the start.
  devices[devices.length - 1].output.connect(devices[0].input);

  return {
    input: devices[0].input,
    output: output.output,
  };
}
