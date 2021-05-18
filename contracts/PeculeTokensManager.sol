// contracts/PeculeTokenManager.sol
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.8.0;
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PeculeToken.sol";

 interface PCLTTokensInterface {
    enum State { SALE_CLOSED, SALE_OPEN}
    function balanceOf(address _address) external;
    function totalSupply() external;
    function getHoldersBalances(address _address) external view;
    function getHolderAddress(uint _id) external view;
    function removeHolder(address _address) external;
    function getHoldersCount() external;
 }
  

contract PeculeTokensManager is Ownable{
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    using SafeMath for int;
    
    enum State { SALE_CLOSED, SALE_OPEN}
    State CurrentState;

    event PriceResult(uint tokenPrice, uint priceFeed);
    
    struct Estate {
        address tokenAddress;
        uint8 ROI;
        uint tokenPrice;
        uint estatePrice;
    }
    
    AggregatorV3Interface internal priceFeed;
    Counters.Counter private estateIds;
    PCLTTokens private token; 
    PCLTTokensInterface private PCLTTokensContract;
    
    mapping(address => uint256) private tokensBalances;
    mapping(uint => Estate) public Estates; // use to find witch token address is linked with estate id.
    mapping(uint => PCLTTokens) public tokenList;
    
    
    receive() external payable {}
    
    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor()  {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }
    
    function getTokensHoldersCount(uint _id) public view returns(uint) {
         return tokenList[_id].getHoldersCount();
    }
    
    function getTokensHolders(uint _tokenId, uint _holderId) public view returns(address, uint) {
        return( tokenList[_tokenId].getHolderAddress(_holderId), tokenList[_tokenId].getHoldersBalances( tokenList[_tokenId].getHolderAddress(_holderId)));
    }
    
    function removeHolders(uint _tokenId, address _address) public {
         tokenList[_tokenId].removeHolder(_address);
    }
    function getLatestPrice() public view returns(int) {
        (
            uint80 roundID,
            int price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        // If the round is not complete yet, timestamp is 0
        require(timeStamp > 0, "Round not complete");
        return (price);
    }
    
    function TokenizeEstate(
        string memory _name,
        uint _totalSupply,
        uint8 _yearROI,
        uint _estatePrice,
        uint _tokenPrice
        ) public {
            
        uint estateId = estateIds.current();
        token = new PCLTTokens(_name, "PCT", _totalSupply*10**18);
        Estates[estateId] = Estate(address(token), _yearROI, _tokenPrice, _estatePrice);
        tokenList[estateId] = token;  
        estateIds.increment();
    }
    
    function buyTokens(uint256 _id, uint256 _amount ) public payable returns(uint) {
        require(msg.value == _amount, "Incorrect amount send");
        require(CurrentState == State.SALE_OPEN, "Tokens sale not open");
        uint tokenToSent =_amount.div(getTokenPriceInwei(_id));
        tokenList[_id].transfer(msg.sender, tokenToSent);
        return tokenToSent;
        // todo store the buyer address and number of shares in 2 arrays
    }
    
    function getTokenPriceInwei(uint _amount) public returns(uint){
        uint EthPrice  = uint(getLatestPrice());
        uint test = 50;
        uint tokenPrice = (test.mul(10**18)).div(EthPrice);
        uint tokenToSent = _amount.div(tokenPrice.mul(10**8)) ;
        emit PriceResult(tokenPrice, tokenToSent);
        return _amount;
    }
    
    function getBalanceByToken(uint _id) public view returns(uint) {
        return tokenList[_id].balanceOf(address(this));
    }
    
    function getTotalSupply(uint _id) public view returns(uint) {
         return tokenList[_id].totalSupply();
    }
    
    function setPCLTTokenContractAddress(address _address) external onlyOwner {
        PCLTTokensContract = PCLTTokensInterface(_address);
    }
    
    function openSale() public {
        CurrentState = State.SALE_OPEN;
    }
    
    function closeSale() public onlyOwner{
        CurrentState = State.SALE_CLOSED;
    }
    function balanceOf(uint _id) public view returns(uint) {
         return tokenList[_id].balanceOf(msg.sender);
    }
}