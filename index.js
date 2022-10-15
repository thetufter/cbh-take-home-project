const { deterministicPartitionKey } = require("./dpk");

console.log(deterministicPartitionKey({ notPartitionKey: "test" }));
