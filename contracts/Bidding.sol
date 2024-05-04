// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Bidding {
    enum ProjectStatus { Open, InProgress, Completed, Canceled }

    struct Project {
        address client;
        string name;
        string outline;
        string description;
        uint expectedPay;
        string category;
        ProjectStatus status;
        address selectedFreelancer;
        mapping(address => uint) bids; // Freelancer address => Bid amount
    }

    mapping(uint => Project) public projects;
    uint public numProjects;

    event ProjectCreated(uint projectId, address client, string name, string category, uint expectedPay);
    event BidPlaced(uint projectId, address bidder, uint amount);
    event FreelancerSelected(uint projectId, address freelancer);
    event ProjectStatusChanged(uint projectId, ProjectStatus status);
    event PaymentReleased(uint projectId, uint amount, address freelancer);

    function createProject(
        string memory _name,
        string memory _outline,
        string memory _description,
        uint _expectedPay,
        string memory _category
    ) external {
        uint projectId = numProjects++;
        projects[projectId].client = msg.sender;
        projects[projectId].name = _name;
        projects[projectId].outline = _outline;
        projects[projectId].description = _description;
        projects[projectId].expectedPay = _expectedPay;
        projects[projectId].category = _category;
        projects[projectId].status = ProjectStatus.Open;
        projects[projectId].selectedFreelancer = address(0);

        emit ProjectCreated(projectId, msg.sender, _name, _category, _expectedPay);
    }

    function placeBid(uint projectId, uint amount) external {
        Project storage project = projects[projectId];
        require(project.status == ProjectStatus.Open, "Project is not open for bidding");
        require(amount > project.bids[msg.sender], "Your bid must be higher than the current bid");
        
        project.bids[msg.sender] = amount;
        
        emit BidPlaced(projectId, msg.sender, amount);
    }

    function selectFreelancer(uint projectId, address freelancer) external {
        Project storage project = projects[projectId];
        require(project.client == msg.sender, "Only client can select a freelancer");
        require(project.status == ProjectStatus.Open, "Project is not open for freelancer selection");

        project.selectedFreelancer = freelancer;
        project.status = ProjectStatus.InProgress;

        emit FreelancerSelected(projectId, freelancer);
        emit ProjectStatusChanged(projectId, ProjectStatus.InProgress);
    }

    function completeProject(uint projectId) external payable {
        Project storage project = projects[projectId];
        require(project.client == msg.sender, "Only client can complete the project");
        require(project.status == ProjectStatus.InProgress, "Project is not in progress");

        project.status = ProjectStatus.Completed;

        // Transfer payment to freelancer
        require(msg.value == project.expectedPay, "Incorrect payment amount");

        payable(project.selectedFreelancer).transfer(msg.value);

        emit PaymentReleased(projectId, msg.value, project.selectedFreelancer);
        emit ProjectStatusChanged(projectId, ProjectStatus.Completed);
    }

    function cancelProject(uint projectId) external {
        Project storage project = projects[projectId];
        require(project.client == msg.sender, "Only client can cancel the project");
        require(project.status == ProjectStatus.Open, "Project is not open");

        project.status = ProjectStatus.Canceled;

        emit ProjectStatusChanged(projectId, ProjectStatus.Canceled);
    }

    function getBidAmount(uint projectId, address bidder) external view returns (uint) {
        return projects[projectId].bids[bidder];
    }
}
