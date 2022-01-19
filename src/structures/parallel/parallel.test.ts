import { node } from "../../core/node/node";
import { make_pipe, pipe } from "../../core/pipe";
import { parallel } from "./parallel";

it("combines inputs and outputs for parallel nodes.", () => {
  const a = make_pipe();
  const b = make_pipe();
  const c = make_pipe();

  const p = parallel(a, b, c);

  expect(p.input.get_connections()).toEqual(
    expect.arrayContaining([a.input, b.input, c.input])
  );
  expect(p.output.get_connections()).toEqual(
    expect.arrayContaining([a.output, b.output, c.output])
  );
});
