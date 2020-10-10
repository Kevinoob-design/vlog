export default (() => {
  const cluster = require('cluster');

  if (cluster.isMaster) {
    console.log(`> Master ${process.pid} is running`);

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', (worker, code, signal) => {
      console.log(`> worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    require('./server');
  }
})();
