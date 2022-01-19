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

it("does not double-add connections.", () => {
  const n = new node();

  const c1 = new node();

  n.connect(c1);
  n.connect(c1);

  const connections = n.get_connections();
  expect(connections).toHaveLength(1);
  expect(connections).toContain(c1);
});

it("adds bi-directional connections.", () => {
  const n = new node();
  const c1 = new node();

  n.connect(c1);
  c1.connect(n);

  const n_connections = n.get_connections();
  const c1_connections = c1.get_connections();

  expect(n_connections).toHaveLength(1);
  expect(n_connections).toContain(c1);

  expect(c1_connections).toHaveLength(1);
  expect(c1_connections).toContain(n);
});
