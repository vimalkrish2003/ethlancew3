// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract PlaceBid {
    enum BidStatus { Pending, Accepted, Rejected }

    struct Bid {
        string projectId;
        address clientAddress;
        address freelancerAddress;
        string proposal;
        uint deliveryTime;
        uint bidAmount;
        BidStatus statusFlag;
    }

    mapping(string => Bid[]) public bids;

    event BidPlaced(string indexed projectId, address indexed clientAddress, address indexed freelancerAddress, string proposal, uint deliveryTime, uint bidAmount, BidStatus statusFlag);

    function placeBid(string memory projectId, address __clientAddress, string memory _proposal, uint _deliveryTime, uint _bidAmount, BidStatus _statusFlag) external {
        Bid memory newBid = Bid({
            projectId: projectId,
            clientAddress: __clientAddress,
            freelancerAddress: msg.sender,
            proposal: _proposal,
            deliveryTime: _deliveryTime,
            bidAmount: _bidAmount,
            statusFlag: _statusFlag
        });

        bids[projectId].push(newBid);
        emit BidPlaced(projectId, __clientAddress, msg.sender, _proposal, _deliveryTime, _bidAmount, _statusFlag);
    }

    function getBid(string memory projectId, uint index) external view returns (address, address, string memory, uint, uint, BidStatus) {
        Bid memory bid = bids[projectId][index];
        return (bid.clientAddress, bid.freelancerAddress, bid.proposal, bid.deliveryTime, bid.bidAmount, bid.statusFlag);
    }

    function getBidsCount(string memory projectId) external view returns (uint) {
        return bids[projectId].length;
    }

    function getBidData(string memory projectId, uint index) external view returns (address, address, string memory, uint, uint, BidStatus) {
        Bid memory bid = bids[projectId][index];
        return (bid.clientAddress, bid.freelancerAddress, bid.proposal, bid.deliveryTime, bid.bidAmount, bid.statusFlag);
    }
}
