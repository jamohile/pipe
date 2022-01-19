import { node } from "../../core/node/node";
import { split } from "./split";

it("combines inputs for split nodes.", () => {
  const a = { input: new node() };
  const b = { input: new node() };
  const c = { input: new node() };

  const splitted = split(a, b, c);

  // Expect them all to share a (for this example, single) input.
  expect(a.input.get_connections().includes(splitted));
  expect(b.input.get_connections().includes(splitted));
  expect(c.input.get_connections().includes(splitted));
});
