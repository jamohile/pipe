/**
 * A node is the base primitive of a circuit.
 * Components interface with eachother by being connected at their nodes.
 */
export class node {
  /** A list of other nodes this node is connected to. */
  private connections: Set<node> = new Set();

  /** Connect to another node.
   *  This is done bi-directionally.
   */
  public connect(n: node, { bidirectional = true } = {}) {
    this.connections.add(n);
    if (bidirectional) {
      n.connect(this, { bidirectional: false });
    }
  }

  /** Get all connected nodes. */
  public get_connections(): node[] {
    return [...this.connections.values()];
  }
}