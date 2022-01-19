import { node } from "../../core/node/node";
import { pipe } from "../../core/pipe";
import { parallel } from "./parallel";

it("combines inputs and outputs for parallel nodes.", () => {
  const a: pipe = { input: new node(), output: new node() };
  const b: pipe = { input: new node(), output: new node() };
  const c: pipe = { input: new node(), output: new node() };

  const p = parallel(a, b, c);

  expect(p.input.get_connections()).toEqual(
    expect.arrayContaining([a.input, b.input, c.input])
  );
  expect(p.output.get_connections()).toEqual(
    expect.arrayContaining([a.output, b.output, c.output])
  );
});
