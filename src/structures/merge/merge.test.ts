import { node } from "../../core/node/node";
import { merge } from "./merge";

it("combines outputs for merged nodes.", () => {
  const a = { output: new node() };
  const b = { output: new node() };
  const c = { output: new node() };

  const merged = merge(a, b, c);

  // Expect them all to share a (for this example, single) output.
  expect(a.output.get_connections().includes(merged));
  expect(b.output.get_connections().includes(merged));
  expect(c.output.get_connections().includes(merged));
});
