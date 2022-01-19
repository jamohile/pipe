import { inputtable, isPipe, make_pipe, outputtable, pipe } from "../../core/pipe";

/**
 * Connect these devices in series.
 * While all the intermediary items must be pipes, the first and last don't have to be.
 * This is because the first and last elements can start/terminate the series operation.
 */
export function series<S extends SeriesStart, E extends SeriesEnd>(
  ...devices: [S, ...pipe[], E]
): Series<S, E> {
  const first = devices[0] as S;
  const last = devices[devices.length - 1] as E;

  let current: S | pipe | E = first;

  for (const d of devices.slice(1)) {
    // E only gets assigned at the end of the list.
    (current as outputtable).output.connect((d as inputtable).input);
    current = d as S | pipe | E;
  }

  if (isPipe(first) && isPipe(last)) {
    return {
      input: first.input,
      output: last.output,
    } as Series<S, E>;
  }

  if (isPipe(first)) {
    return {
      input: first.input,
    } as Series<S, E>;
  }

  if (isPipe(last)) {
    return {
      output: last.output,
    } as Series<S, E>;
  }

  return undefined as Series<S, E>;
}

/**
 * The start of a series must have an output, so it can feed forward,
 * But it doesn't necessarily have to have an input.
 */
type SeriesStart = outputtable | pipe;

/**
 * The end of a series must have an input, so it can recieve,
 * But it doesn't necessarily have to have an output.
 */
type SeriesEnd = inputtable | pipe;

/** The nature of a series depends on the input and output. */
export type Series<S extends SeriesStart, E extends SeriesEnd> =
  /** If both the start and end are pipes,
   *  Then the whole series acts like a pipe.
   */
  S extends pipe
    ? E extends pipe
      ? pipe
      : /** If the start was a pipe, but end isn't, the series takes input no output*/
        inputtable
    : /** If start was not a pipe, but end is,
     * series provides output but takes no input. */
    E extends pipe
    ? outputtable
    : /** Otherwise, there is no 'combined' series behaviour...the nodes are disjoint from rest of circuit. */
      undefined;
