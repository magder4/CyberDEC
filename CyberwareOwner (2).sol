pragma solidity >=0.5.0 <0.6.0;

import "./CyberwareFight.sol";
import "./ERC721.sol";
import "./SafeMath.sol";

contract CyberwareOwner is CyberwareFight, ERC721 {

  using SafeMath for uint256;

  mapping (uint => address) cyberwareApprovals;

  function balanceOf(address _owner) external view returns (uint256) {
    return ownerCyberwareCount[_owner];
  }

  function ownerOf(uint256 _tokenId) external view returns (address) {
    return cyberwareToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerCyberwareCount[_to] = ownerCyberwareCount[_to].add(1);
    ownerCyberwareCount[msg.sender] = ownerCyberwareCount[msg.sender].sub(1);
    cyberwareToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
      require (cyberwareToOwner[_tokenId] == msg.sender || cyberwareApprovals[_tokenId] == msg.sender);
      _transfer(_from, _to, _tokenId);
    }

  function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {
      cyberwareApprovals[_tokenId] = _approved;
      emit Approval(msg.sender, _approved, _tokenId);
    }

}
