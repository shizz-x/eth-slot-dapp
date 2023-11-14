### eth-slot-dapp

# [build](https://shizz-x.github.io/eth-slot-dapp/build/)
# private key for test - 0x3ac9DFFb3129fEE0258F09b0aC1715747f3b4c46
# [sepolia](https://sepolia.etherscan.io/address/0xB2FF2a48cB6E1FeE09d2dd3a38175eC65d51dA38)


Spins all erc20 tokens [PREVIEW VIDEO](https://youtu.be/0wnJCGQI0pc)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Test](#Test)
- [Smart Contract](#smart-contract)

## Introduction

This application allows you to play the slot for the token specified at the build stage

## Features

- Live transactions
- Сhange in the amount and percentage of winnings after the deposit of the contract
- Using any erc20 tokens

## Getting Started

The first step is to install dependencies

```bash
cd path
```

```bash
yarn
```

Now you need to change the network in src/net/rpc

Go to the [remix](http://remix.ethereum.org/) and deploy GamblingContract.sol.

Update newly created contract address in src/net/ABI/SlotContracAddress.jsx

Transfer the tokens that the application will use to the newly created contract.

Update the token address that you transferred in src/net/ABI/SpendedTokenAddress.jsx

Now you can build and deploy

```bash
yarn build
```

### Test

You can simply build a project from the repository and test the applications, before that you need to create your token on the Sepolia network and transfer it to the contract

```bash
yarn start
```

### Smart Contract

## Features

### 1. Game Mechanics

- Users can participate in the game by calling the `play` function, providing an ERC-20 token address and an amount they want to wager.
- The contract uses a random number generated from a combination of factors, including the current timestamp, sender's address, and game history to determine the game's outcome.

### 2. Payouts

- The game offers different payout percentages based on the outcome, allowing users to potentially win various multiples of their wagered amount.
- Payout percentages are adjustable and can be modified by the contract owner.

### 3. Data Storage

- The contract maintains a record of the user's game history, including the percentage won, the amount won, the random result, and whether the user was a winner or loser.

### 4. Ownership Control

- The contract has an owner who can perform specific administrative functions such as modifying the payout percentages, withdrawing funds, and transferring ownership.

### 5. Withdrawals

- Users who have won the game can withdraw their winnings in the same ERC-20 token they used to participate.

## Functions

The following are the key functions provided by the `GamblingContract`:

- `play(address tokenAddress, uint256 amount)`: Allows users to participate in the game by wagering a specified amount of an ERC-20 token.

- `withdraw(address tokenAddress)`: Enables users to withdraw their winnings in the chosen ERC-20 token.

- `ownerWithdraw(address tokenAddress, uint256 amount)`: Allows the contract owner to withdraw funds from the contract.

- `transferOwner(address newOwner)`: Enables the current owner to transfer ownership of the contract to another address.

- `changeWinRate(uint[] memory percentage)`: Permits the owner to adjust the payout percentages for different outcomes.

- `changePercents(uint[] memory percentage)`: Allows the owner to modify the specific payout percentages.

- `getGameHistory(address user)`: Provides users with access to their game history, including the outcomes and results of their previous games.

- `getWinning(address user)`: Allows users to check their current winnings in the game.
