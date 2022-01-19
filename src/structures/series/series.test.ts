import { node } from "../../core/node/node";
import { make_pipe } from "../../core/pipe";
import { series } from "./series";

it("links together pipes in series.", () => {
  const a = make_pipe();
  const b = make_pipe();
  const c = make_pipe();

  const s = series(a, b, c);

  // First node connects to world.
  expect(a.input).toEqual(s.input);

  // All nodes chained to eachother.
  expect(a.output.get_connections()).toHaveLength(1);
  expect(a.output.get_connections()).toContain(b.input);

  expect(b.output.get_connections()).toHaveLength(1);
  expect(b.output.get_connections()).toContain(c.input);

  // Final node should connect to world.
  expect(c.output).toEqual(s.output);
});

it("creates an outtable if first node has no input.", () => {
  const a = { output: new node() };
  const b = make_pipe();
  const c = make_pipe();

  const s = series(a, b, c);

  // No input connection to world.
  expect(s).not.toHaveProperty("input");

  // All nodes chained to eachother.
  expect(a.output.get_connections()).toHaveLength(1);
  expect(a.output.get_connections()).toContain(b.input);

  expect(b.output.get_connections()).toHaveLength(1);
  expect(b.output.get_connections()).toContain(c.input);

  // Final node should connect to world.
  expect(c.output).toEqual(s.output);
});

it("creates an inputtable if las node has no output.", () => {
  const a = make_pipe();
  const b = make_pipe();
  const c = { input: new node() };

  const s = series(a, b, c);

  // First node connects to world.
  expect(a.input).toEqual(s.input);

  // All nodes chained to eachother.
  expect(a.output.get_connections()).toHaveLength(1);
  expect(a.output.get_connections()).toContain(b.input);

  expect(b.output.get_connections()).toHaveLength(1);
  expect(b.output.get_connections()).toContain(c.input);

  // No output connection to world.
  expect(s).not.toHaveProperty("output");
});

it("creates disconnected if no input, output.", () => {
  const a = { output: new node() };
  const b = make_pipe();
  const c = { input: new node() };

  const s = series(a, b, c);

  // All nodes chained to eachother.
  expect(a.output.get_connections()).toHaveLength(1);
  expect(a.output.get_connections()).toContain(b.input);

  expect(b.output.get_connections()).toHaveLength(1);
  expect(b.output.get_connections()).toContain(c.input);

  // No output connection to world.
  expect(s).toBeUndefined();
});
