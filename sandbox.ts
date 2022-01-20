import { node } from "./src/core/node/node";
import { make_pipe, pipe } from "./src/core/pipe";
import { connect } from "./src/structures/connect/connect";
import { loop } from "./src/structures/loop/loop";
import { parallel } from "./src/structures/parallel/parallel";
import { series } from "./src/structures/series/series";
import { split } from "./src/structures/split/split";

const rectifier = loop((out) => [
  make_pipe(),
  make_pipe(),
  out,
  make_pipe(),
  make_pipe(),
]);

// Can we make a bridge_rectifier?
// I don't think we can in one go...but using a few components, definitely.
// This is one possible implementation.

function diode() {
  return make_pipe();
}

function resistor() {
  return make_pipe();
}

function bridge_rectifier(): { ac: pipe; dc: pipe } {
  const d1 = diode();
  const d2 = diode();
  const d3 = diode();
  const d4 = diode();

  const bridge = resistor();

  const loop1 = loop((dc_plus) => [d1, dc_plus, bridge, d2]);
  const loop2 = loop((dc_minus) => [d4, dc_minus, bridge, d3]);

  return {
    ac: {
      input: loop1.input,
      output: loop1.input,
    },
    dc: {
      input: loop2.output,
      output: loop2.output,
    },
  };
}

function bridge_rectifier_2(): { ac: pipe; dc: pipe } {
  const bridge = resistor();

  const loop1 = loop((dc_plus) => [diode(), dc_plus, bridge, diode()]);
  const loop2 = loop((dc_minus) => [diode(), dc_minus, bridge, diode()]);

  return {
    ac: {
      input: loop1.input,
      output: loop1.input,
    },
    dc: {
      input: loop2.output,
      output: loop1.output,
    },
  };
}

// Now, say we'd like a circuit with a bridge rectifier connected to an AC source, and a DC output.
// This DC signal is then connected to a cap and load resitor.

// One implementation.
const ground = new node();
const rectifier1 = bridge_rectifier_2();

loop([
  // AC voltage source.
  make_pipe(),
  rectifier1.ac,
]);

loop([
  rectifier1.dc,
  parallel(
    // capacitor
    make_pipe(),
    // resistor
    make_pipe()
  ),
]);

// Boom! That's our circuit. Not bad....
// These are technically independent of eachother joined by the rectifier, is it at all possible to combine into a single call?
// Even if not....I kind of like this representation.

// We can perhaps make it a bit more formal through this.

const circuit = connect(
  ground,
  // AC loop.
  loop([
    // AC voltage source.
    make_pipe(),
    rectifier1.ac,
  ]),
  // DC loop.
  loop([
    rectifier1.dc,
    parallel(
      // capacitor
      make_pipe(),
      // resistor
      make_pipe()
    ),
  ])
);

// INTERPRETATION:
// Create a circuit by connecting ground to two subcircuit nodes.
// For the first, connect an AC voltage source in a loop with a rectifier (AC arm)
// For the second, connect that rectifier's RC arm to a cap and res in parallel.


// This is a really cool expression of the bridge rectifier!

function bridge_rectifier_3(): { ac: pipe; dc: pipe } {
    const bridge = resistor();

    const ac_plus = make_pipe();
    const ac_minus = make_pipe();
  
    const loop1 = loop((dc_plus) => [diode(), dc_plus, bridge, diode()]);
    const loop2 = loop((dc_minus) => [diode(), dc_minus, bridge, diode()]);

    const ac: pipe = {
        input: loop1.input,
        output: loop2.input
    };

    const dc: pipe = {
        input: loop2.output,
        output: loop1.input
    };
  
    return {ac, dc};
  }