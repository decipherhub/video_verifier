#!/bin/bash
#geth --identity "verifier" --rpc --rpcport "8545" --rpccorsdomain "*" --datadir "/Users/jaeykim/video_verifier/private_chain" --port "8545" --nodiscover --rpcapi "db,eth,net,web3" --networkid 2018
geth --datadir="./private_chain" --networkid 15 --rpc --rpcport "8545" --rpcapi "admin,eth,miner,web3" --port 3001
