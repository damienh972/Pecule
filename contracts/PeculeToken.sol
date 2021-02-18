// contracts/PeculeToken.sol
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.8.0;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC20PeculeCustom.sol";

/** @author Damien HELOISE [damienjheloise@gmail.com]
  * @title PeculeToken PCLT 
  * @dev Token creator and distributor 
  */
contract PCLTTokens is ERC20, Ownable {
    event EstateTokenCreated(address owner, uint initialSupply);
    
    /// @dev Standart ERC20 constructor from oppenzeppelin smartcontract library
   
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, _totalSupply);
    }
    
}