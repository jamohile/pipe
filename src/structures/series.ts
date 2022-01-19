import { inputtable, outputtable, pipe } from "../core/pipe";

/**
 * Connect these devices in series.
 * While all the intermediary items must be pipes, the first and last don't have to be.
 * This is because the first and last elements can start/terminate the series operation.
 */
export function series(...devices: pipe[]): pipe {
  const first = devices[0];
  const last = devices[devices.length - 1];

  let current = first;
  for (const d of devices.slice(1)) {
    current.output.connect(d.input);
    current = d;
  }
  return {
    input: first.input,
    output: last.output,
  };
}
