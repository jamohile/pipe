![](https://user-images.githubusercontent.com/17712692/150270109-e301c01f-00e0-4ceb-8127-cb643e43a0fd.png)
# Pipe

(TODO: expand on this, this is just a basic idea.)

## What is pipe?
Pipe is a library for declaratively designing circuits. It lets us break up circuits into reusable functions, just like we would with code.

There are two key aspects to this.
- **Design**: pipe can compile a circuit down to a graph representation. This graph could then be exported to other formats, where it could be simulated, etc. (TODO)
- **Simulation**: (TODO) Pipe could be instrumented to simulate circuit behaviour. Maintaining some state (e.g current, voltage), pipe could propagate these through the graph over time.

These two functions are both exciting in their own right, but offer two very different potential benefits.

### Design
By enabling design specification in a higher-level language, Pipe could make the process of desigining itself easier and more intuitive. Allowing separation of elements into functions and classes, manipulation of the object graph, etc, Pipe could make the design experience more like code manipulation.

It must be noted here: Pipe does **not** involve dynamic code as part of the hardware. A pipe-circuit of course compiles down to a static graph of components. However, by having that specification and compilation process **itself** be dynamic, enables us to design in a flexible and efficient way.

### Simulation (TODO)
Pipe has elements like resistors, capacitors, etc. While these compile down to static representations...Pipe of course has access to them in object-form while it is running.

There's no reason why they cannot contain internal state, and even models that govern their simulated performance.

For example, a resistor object could express its output-node voltage and current based on its input one. This would be captured during a time-step numerical simulation.

## Basic Concepts
In pipe, there are two fundamental concepts: nodes, and pipes. We'll see that the 'pipe' **object** is incredibly important, and is the namesake of the library itself.

ALL DOCS BELOW ARE WIP.

### Nodes
Let's start with nodes. They are the most fundamental component of pipe.

A node is a single connection-point in a circuit. It maintains a list of connections to other nodes.

It multiple nodes are connected - they are in-effect the **same node**. Pipe doesn't do simulation just yet, but when it does, the properties of one node (voltage, current, etc) are the properties of all others it is connected to.

You can think of a node as an 'ideal wire'.

## Pipes
Of course, a circuit with just nodes, and therefore a single state...really doesn't do much!

Let's take a step back, and consider what a component in a circuit really is. It is a collection of one or more inputs, along with some function that relates the state of one to the state of the others - potentially alongside external factors such as time.

We could represent these devices as a group of nodes! For design, we just have to keep track of the connections...while for simulation we could actually evaluate that functional relationship.

In circuits, **two-node devices are incredibly common** (think capacitors, resistors, voltage sources, etc). For that reason, in this library, we give them a special name: **pipe**. 

```ts
interface pipe {
    input: node,
    output: node
}
```

Makes sense, doesn't it? A **pipe** is any object that has both an input and an output - if we wanted, we could express logic that describes their respective states, but for design this is enough.

## Extending Pipes
Sometimes a device will have more than two nodes...consider a transistor, which has three. 

```ts
interface transistor {
    gate: node,
    source: node,
    drain: node
}
```

On its own, we can absolutely use it already. Each of those nodes can be connected to other parts of the circuit - but we can make it even friendlier!

```ts
const t: transistor;

const channel: pipe = {
    input: t.source,
    output: t.drain
}
```

See what we did there? The transistor's source and drain often appear to parts of a circuit as a single series device - so we can just turn them into a pipe! Now, we can deal with individual transistor nodes when required, and simplify it when we'd like.

This is just a toy example - but it illustrates how powerful this method could be as we expand to more advanced devices.



