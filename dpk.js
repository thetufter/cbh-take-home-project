const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  const hashIt = (s) => crypto.createHash("sha3-512").update(s).digest("hex");

  if (event === undefined) {
    return TRIVIAL_PARTITION_KEY;
  } else if (event.partitionKey) {
    const partitionKey =
      typeof event.partitionKey === "string"
        ? event.partitionKey
        : JSON.stringify(event.partitionKey);

    if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
      return hashIt(partitionKey);
    } else {
      return partitionKey;
    }
  } else {
    return hashIt(JSON.stringify(event));
  }
};
