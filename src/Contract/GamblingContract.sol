
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import "./IERC20.sol";

contract GamblingContract {

    address owner;

    struct GameResult {
        uint percentage;
        uint amount;
        uint results;
        bool isWinner;
    }

    address gameToken;
  
    uint256 private RandNonce = 0;
    uint[] public payoffs = [0, 110, 125, 150, 200, 300, 400, 500, 1000];
    uint[] private percents = [659625, 809625, 909625, 959625, 984125, 994125, 994750, 997375, 999500];
    
    modifier _ownerOnly(){
      require(msg.sender == owner);
      _;
    }
    constructor() {
        owner = msg.sender;
        gameToken = 0x1C67d17f6f5086c837ecAcf35ce44BD9902b4a7e;
    }
    mapping(address => uint) private userBalance;
    mapping(address => GameResult[]) private userGameHistory;

    event Winner(address indexed user, uint percentage, uint amount);
    event Loser(address indexed user, uint amount);

    function play(uint256 amount) external {
        require(userBalance[msg.sender] >= amount);

        uint randomNumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, userGameHistory[msg.sender].length, RandNonce))) % 1000000;
        uint percentage = 0;

        if (randomNumber < percents[0]) {
            // Lose - 65.9625%
            percentage = payoffs[0];
        } else if (randomNumber < percents[1]) {
            // x1.1 - 15%
            percentage = payoffs[1];
        } else if (randomNumber < percents[2]) {
            // x1.25 - 10%
            percentage = payoffs[2];
        } else if (randomNumber < percents[3]) {
            // x1.5 - 5%
            percentage = payoffs[3];
        } else if (randomNumber < percents[4]) {
            // x2 - 2.5%
            percentage = payoffs[4];
        } else if (randomNumber < percents[5]) {
            // x3 - 1%
            percentage = payoffs[5];
        } else if (randomNumber < percents[6]) {
            // x4 - 0.5%
            percentage = payoffs[6];
        } else if (randomNumber < percents[7]) {
            // x5 - 0.025%
            percentage = payoffs[7];
        } else if (randomNumber < percents[8]) {
            // x10 - 0.0125%
            percentage = payoffs[8];
        }
        if (percentage > 0) {
            uint amountOfWin = ((amount * percentage) / 100);
            userGameHistory[msg.sender].push(GameResult(percentage, amountOfWin, randomNumber, true));
            userBalance[msg.sender] += amountOfWin;

            emit Winner(msg.sender, percentage, amount);
        } else {
            userBalance[msg.sender] -= amount;
            userGameHistory[msg.sender].push(GameResult(percentage, amount, randomNumber, false));
            emit Loser(msg.sender, amount);
        }
        
        RandNonce ++;
    }
    function withdraw() external {
        IERC20 token = IERC20(gameToken);
        require(userBalance[msg.sender] > 0);

        uint amount = userBalance[msg.sender];
        require(token.balanceOf(address(this)) >= amount);
        require(token.transfer(msg.sender, amount));

        userBalance[msg.sender] = 0;
    }
    function ownerWithdraw(address tokenAddress, uint256 amount)  _ownerOnly external {
        IERC20 token = IERC20(tokenAddress);

        require(token.balanceOf(address(this)) >= amount);

        require(token.transfer(msg.sender, amount));
    }

    function deposit(uint256 amount) external{
        IERC20 token = IERC20(gameToken);
        
        require(token.balanceOf(msg.sender) >= amount);
        require(token.allowance(msg.sender, address(this)) >= amount);
        require(token.transferFrom(msg.sender, address(this), amount));

        userBalance[msg.sender] += amount;

    }


    function transferOwner(address newOwner) _ownerOnly public  {
        owner = newOwner;
    }
    function changeWinRate(uint[] memory percentage) _ownerOnly  public  {
        require(percentage[0] == 0);
        require(percentage.length == 9);
        payoffs = percentage;
    }
    function changePlayingToken(address newToken) _ownerOnly public{
        gameToken = newToken;
    }
    function changePercents(uint[] memory percentage) _ownerOnly public  {
        require(percentage.length == 9);
        payoffs = percentage;
    }
    function getGameHistory(address user) external view returns (GameResult[] memory) {
        return userGameHistory[user];
    }
    function getWinning(address user) external view returns (uint) {
        return userBalance[user];
    }
}
