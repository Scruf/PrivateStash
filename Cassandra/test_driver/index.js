const cassandra = require('cassandra-driver');
const async = require('async');
var clinet  = new cassandra.Client({contactPoints:['127.0.0.1'],keyspace: 'demo'});

 clinet.connect(function (err) {
  if (err) {
    clinet.shutdown();
    return console.error('There was an error when connecting', err);
  }
  console.log('Connected to cluster with %d host(s): %j', clinet.hosts.length, clinet.hosts.keys());
  console.log('Keyspaces: %j', Object.keys(clinet.metadata.keyspaces));
  console.log('Shutting down');
  clinet.shutdown();
});