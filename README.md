example-node-cassandra
======================

It is a simple example to CRUD using Node.js and Apache Cassandra!

## Dependencies

For this example I used `express` and the driver for Apache Cassandra `cassandra-driver`.

## Installation

You need to have installed node.js and Apacha Cassandra!
I'll create a Gits about installation and configured Apache Cassandra.

`git clone https://github.com/rasekar2000/example-node-cassandra.git`

`npm install`

## Usage

Edit the file `app.js` and change the host port connection to Cassandra `hosts : [hostname.concat(':').concat('9160')]`.

After...

`CASSANDRA_HOST=localhost node app.js`

## Result 

Open your browser to link `http://localhost:8181/`

![](example-cassandra-node.png)
