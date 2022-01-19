/**
 * A node is the base primitive of a circuit.
 * Components interface with eachother by being connected at their nodes.
 */
export class node {
  /** A list of other nodes this node is connected to. */
  private connections: Set<node> = new Set();

  /** Connect to another node. */
  public connect(n: node) {
    this.connections.add(n);
  }
}
