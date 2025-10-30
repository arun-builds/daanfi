# daanfi

This is a Vite app containing:

- Tailwind CSS setup for styling
- Useful wallet UI elements setup using [@solana/web3.js](https://www.npmjs.com/package/@solana/web3.js)
- A basic Greeter Solana program written in Anchor
- UI components for interacting with the Greeter program using the Anchor generated client

## Getting Started

### Installation


#### Install Dependencies

```shell
bun install
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the
command with `bun`, eg: `pnpm anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the
Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/counter-exports.ts` to match the new program id.

```shell
bun anchor keys sync
```

#### Build the program:

```shell
bun anchor-build
```

#### Start the test validator with the program deployed:

```shell
bun anchor-localnet
```

#### Run the tests

```shell
bun anchor-test
```

#### Deploy to Devnet

```shell
bun anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
bun dev
```

Build the web app

```shell
bun build
```
