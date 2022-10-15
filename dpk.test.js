const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("If the input has partitionKey property and it is not a string, stringify it, and if its length > 256, returns partitionKey hashed", () => {
    const result = deterministicPartitionKey({
      partitionKey: {
        test: "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567",
      },
    });
    expect(result).toBe(
      "5cfff7d40b4e031f47275e3d17af5d7e7bf6b7eb2281c168786306ae5e7ee7ba874ef9dda5a102e12ce12fa69c3780fd2b591e2ce6e86a7603a95b3d176506ff"
    );
  });

  it("If the input has partitionKey property and it is not a string, stringify it, and if its length <= 256, returns partitionKey as a string", () => {
    const result = deterministicPartitionKey({
      partitionKey: {
        test: "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
      },
    });
    expect(result).toBe(
      '{"test":"123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"}'
    );
  });

  it("If the input has partitionKey property and it is a string longer than 256 chars, returns partitionKey hashed", () => {
    const result = deterministicPartitionKey({
      partitionKey:
        "test12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567",
    });
    expect(result).toBe(
      "34e222f790b3ef909dfb2423fad10bdd532505dabd5b0fab72b21c0cc67ee153a8c7fdafaa683e68b6e17239ec64b1076cbaf85b64b2762b004bc2931c4b42e8"
    );
  });

  it("If the input has partitionKey property and it is a string not longer than 256 chars, returns partitionKey as is", () => {
    const result = deterministicPartitionKey({
      partitionKey: "test",
    });
    expect(result).toBe("test");
  });

  it("If the input has no partitionKey property, stringfy the input and returns the stringfid input hashed", () => {
    const result = deterministicPartitionKey({ notPartitionKey: "test" });
    expect(result).toBe(
      "3ed3fee9a7db4437d7476b919da24d8017e3043ebbe8bd9b4a3888042f3ed7c0d58b3fc2279d50f427b0fc4ef186c62c9406a7c6868c1caed3014302f2d77b7b"
    );
  });
});
