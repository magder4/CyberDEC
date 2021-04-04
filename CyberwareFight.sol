pragma solidity >=0.5.0 <0.6.0;

import "./CyberwareAssist.sol";

contract CyberwareFight is CyberwareAssist {
  uint randNonce = 0;
  uint attackVictoryProbability = 70;

  function randMod(uint _modulus) internal returns(uint) {
    randNonce = randNonce.add(1);
    return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
  }

  function attack(uint _cyberwareId, uint _targetId) external onlyOwnerOf(_cyberwareId) {
    Cyberware storage myCyberware = cyberwares[_cyberwareId];
    Cyberware storage enemyCyberware = cyberwares[_targetId];
    require(_isReady(myCyberware));
    uint rand = randMod(100);
    if (rand <= attackVictoryProbability) {
      myCyberware.winCount = myCyberware.winCount.add(1);
      myCyberware.level = myCyberware.level.add(1);
      enemyCyberware.lossCount = enemyCyberware.lossCount.add(1);
    } else {
      myCyberware.lossCount = myCyberware.lossCount.add(1);
      enemyCyberware.winCount = enemyCyberware.winCount.add(1);
      _triggerCooldown(myCyberware);
    }
  }
}