# Quick run instructions from Rob

To install

- npm install

To start the server on localhost:4000

- npm start

To run unit tests

- npm test

# Introduction

The goal of this project is to create a server that can traverse tree objects
and return some result. The tree data will be provided to the server in a
particular format, a flattened tree like this example JSON:

    [
      {value: 'root', left: 1, right: 2},
      {value: 'L1', right: 3},
      {value: 'R1'},
      {value: 'R2'}
    ]

The tree above is just one example of a possible tree. The left and right
attributes of each node are optional, and the root element will always be first
element in the list. Each helper library, explained below, will expose a
`getRoot` API to access the root element. The values of the left and right
attributes are indexes into the provided array for the location of the
referenced left or right node. Each helper library will also include a
`getNode` API to access a node by it's index.

The server should accept tree data over HTTP POST requests and return an array
with the values of the nodes listed from an in-order traversal. The in-order
travesal should be from leftmost to rightmost nodes of the tree.

Three different implementations of the algorithm should be provided
and those details are explained below. For all of the implementations, the
server endpoint behavior is the same from an outside consumer. A curl command
like this:

    curl -H "Content-Type: application/json" -X POST -d '[{"value":"root","left":1,"right":2},{"value":"L1","right":3},{"value":"R1"},{"value":"R2"}]' http://localhost:4000/<endpoint>

Should return a response with the following body:

    HTTP/1.1 200
    Content-Type: application/json

    ["L1", "R2", "root", "R1"]

Along with the code to implement the server, please also provide instructions on
how to start the server so it can be tested.

NOTE: It's probably easy to find in-order traversal code for Javascript online
but it's not in your best interest to look at code like that. In a followup
interview we'll start with this codebase as the foundation for more changes. If
the ideas and code are not your own, it will not go smoothly.

# Variation One

The server should implement this variation at the `http://localhost:4000/sync`
endpoint. The tree traversal implementation should use the `lib/SyncTree.js`
library when iterating over the tree data.

# Variation Two

The server should implement this variation at the
`http://localhost:4000/callback` endpoint. The tree traversal implementation
should use the `lib/CallbackTree.js` library when iterating over the tree data.

The goal of this variation is to make sure that can work with callback style
code. Do not turn the callback APIs into promises and work with promises.

# Variation Three

The server should implement this variation at the
`http://localhost:4000/promise` endpoint. The tree traversal implementation
should use the `lib/PromiseTree.js` library when iterating over the tree data.
