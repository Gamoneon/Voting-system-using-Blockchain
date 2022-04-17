# Online Voting System Using BlockChain Technology

> Voting app using Blockchain developed as a part of Internship program.

### Requirements

- [Node.js](https://nodejs.org)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://github.com/trufflesuite/ganache-cli) (Cli)
- [Metamask](https://metamask.io/) (Browser Extension)

### Getting the requirements

1. Download and install **NodeJS**

1. Install **truffle** and **ganache-cli** using node packager manager (npm)

   ```shell
   npm install -g truffle
   npm install -g ganache-cli
   ```

1. Install **metamask** browser extension

### Deployment

1. Get into project Directory

   ```shell
   cd "Voting-app-using-Blockchain"
   ```

1. Run local Ethereum blockchain on Ganache GUI

   > Note: Do not close `ganache gui` until termination of project

1. Import account(s) to `localhost:7545` test network using private keys from ganache-cli to the metamask extension on the browser

1. Deploy smart contract

```shell
  # on the "Voting-app-using-Blockchain" directory
  npx truffle migrate
```

1. Launch the development server (frontend)

   ```shell
   cd client
   npm install
   npm start
   ```

---
