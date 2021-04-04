pragma solidity >=0.5.0 <0.6.0;

import "./CyberwareFactory.sol";
 
contract CyberwareAssist is CyberwareFactory {

  modifier onlyOwnerOf(uint _cyberwareId) {
    require(msg.sender == cyberwareToOwner[_cyberwareId]);
    _;
  }

  function _triggerCooldown(Cyberware storage _cyberware) internal {
    _cyberware.readyTime = uint32(now + cooldownTime);
  }

  function _isReady(Cyberware storage _cyberware) internal view returns (bool) {
      return (_cyberware.readyTime <= now);
  }

  uint levelUpFee = 0.001 ether;

  modifier aboveLevel(uint _level, uint _cyberwareId) {
    require(cyberwares[_cyberwareId].level >= _level);
    _;
  }

  function withdraw() external onlyOwner {
  address payable _owner = address(uint160(owner()));
  _owner.transfer(address(this).balance);
}


  function setLevelUpFee(uint _fee) external onlyOwner {
    levelUpFee = _fee;
  }

  function levelUp(uint _cyberwareId) external payable {
    require(msg.value == levelUpFee);
    cyberwares[_cyberwareId].level = cyberwares[_cyberwareId].level.add(1);
  }

  function changePower(uint _cyberwareId, uint _newPower) external aboveLevel(20, _cyberwareId) onlyOwnerOf(_cyberwareId) {
    cyberwares[_cyberwareId].power = _newPower;
  }

  function getCyberwareByOwner(address _owner) external view returns(uint[] memory) {
    uint[] memory result = new uint[](ownerCyberwareCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < cyberwares.length; i++) {
      if (cyberwareToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
  
}
