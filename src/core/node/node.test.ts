import { node } from "./node";

it("can accept connections.", () => {
  const n = new node();
  n.connect(new node());
});

it("returns all added connections.", () => {
  const n = new node();

  const c1 = new node();
  const c2 = new node();
  const c3 = new node();

  n.connect(c1);
  n.connect(c2);
  n.connect(c3);

  const connections = n.get_connections();
  
  expect(connections).toHaveLength(3);
  expect(connections).toContain(c1);
  expect(connections).toContain(c2);
  expect(connections).toContain(c3);
});
