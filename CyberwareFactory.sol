pragma solidity >=0.5.0 <0.6.0;

import "./Ownable.sol";
import "./SafeMath.sol";

contract CyberwareFactory is Ownable {

  using SafeMath for uint256;
  using SafeMath32 for uint32;
  using SafeMath16 for uint16;

  event NewCyberware(uint cyberwareToOwnerId, string name, uint power);

  uint powerDigits = 3;
  uint powerModulus = 10 ** powerDigits;
  uint cooldownTime = 1 days;
  
  struct Cyberware{
    string name;
    uint power;
    uint32 level;
    uint32 readyTime;
    uint16 winCount;
    uint16 lossCount;
  }

  Cyberware[] public cyberwares;

  mapping (uint => address) public cyberwareToOwner;
  mapping (address => uint) ownerCyberwareCount;

  function _buildCyberware(string memory _name, uint _power) internal {
    uint id = cyberwares.push(Cyberware(_name, _power, 1, uint32(now + cooldownTime), 0, 0)) - 1;
    cyberwareToOwner[id] = msg.sender;
    ownerCyberwareCount[msg.sender] = ownerCyberwareCount[msg.sender].add(1);
    emit NewCyberware(id, _name, _power);
  }

  function _generateRandomPower(string memory _str) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % powerModulus;
  }

  function createRandomCyberware(string memory _name) public {
    require(ownerCyberwareCount[msg.sender] == 0);
    uint randPower = _generateRandomPower(_name);
    randPower = randPower - randPower % 100;
    _buildCyberware(_name, randPower);
  }

}