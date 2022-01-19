/**
 * A node is the base primitive of a circuit.
 * Components interface with eachother by being connected at their nodes.
 */
class node {
    private connections: Set<node> = new Set();

    public connect(n: node) {
        this.connections.add(n);
    }
}