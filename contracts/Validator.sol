pragma solidity ^0.8.5;

contract Validator {
    // ENUMS for physicalStatus
    enum PhysicalStatus {NORMAL, PARTIALLY_PHYSICALLY_CHALLENGED, COMPLETELY_PHYSICALLY_CHALLENGED}

    // Keeping the count of the people so that we know how many persons are registered.
    uint public peopleCount = 0;

    // Array of whitelisted addresses.
    address[] whiteListedAddresses = [0x24475E90aF9E19C7c430e8fC7dF60911b44e031F, 0x8cFf7D9C34448e5963d74c9fD8825C9ca0b41Ec7];

    // The person blueprint.
    struct Person {
        uint id; // Unique identifier for the person to access.
        string firstName; // First Name of the person.
        string lastName; // Last Name of the person.
        string email; // Email of the person.
        bool verified; // Verified 
        bool benefitsGiven; // Verified 
    }

    struct PersonDetails {
        uint income; // in cents
        uint dob; // Date of birth, in integer UNIX time
        PhysicalStatus medicalCondition; // Medical condition if any 
        string phoneNumber; // Phone number 
        string educationQualification; // Educational Qualification 
        uint pinCode; // Educational Qualification 
        string nativeCountry; // Native country
    }
    // City Average Living Expense
    struct CityExpense {
        string name; // Name of the city
        uint pinCode; // pincode of the area
        uint averageExpense; // Average expense of the city.
    }

    // Person mapping, to access an specific person.
    mapping(address => Person) public people;
    mapping(address => PersonDetails) public peopleDetails;
    mapping(uint => address) public peopleAddress;

    // Cities mapping from pinCodes.
    mapping(uint => CityExpense) public pinCodes;

    constructor () public{
        // Adding cities
        pinCodes[560001] = CityExpense("Banglore", 560001, 10000);
        pinCodes[570004] = CityExpense("Mysore", 570004, 9000);
        pinCodes[571441] = CityExpense("Chandagalu", 571441, 5000);
    }


    // Creator Person.
    function createPerson (
        string memory _firstName,
        string memory _lastName,
        string memory _email
    ) public {
        peopleCount = peopleCount + 1;
        peopleAddress[peopleCount] = msg.sender;
        people[msg.sender] = Person(
            peopleCount,
            _firstName,
            _lastName,
            _email,
            false,
            false
        );
    }

    // Add details 
    function addDetails (
        uint _income,
        uint _dob,
        PhysicalStatus _medicalCondition,
        string memory _phoneNumber,
        uint _pinCode,
        string memory _educationQualification,
        string memory _nativeCountry
    ) public {
        people[msg.sender].verified = false;
        peopleDetails[msg.sender] = PersonDetails(
            _income,
            _dob,
            _medicalCondition,
            _phoneNumber,
            _educationQualification,
            _pinCode,
            _nativeCountry
        );
    }

    // Update Person.
    function updatePerson (
        string memory _firstName,
        string memory _lastName,
        string memory _email
    ) public {
        people[msg.sender].firstName = _firstName;
        people[msg.sender].lastName = _lastName;
        people[msg.sender].email = _email;
        people[msg.sender].verified = false;
    }
    
    // Update details 
    function updateDetails (
        uint _income,
        uint _dob,
        PhysicalStatus _medicalCondition,
        string memory _phoneNumber,
        string memory _educationQualification,
        string memory _nativeCountry
    ) public {
        people[msg.sender].verified = false;
        peopleDetails[msg.sender].income = _income;
        peopleDetails[msg.sender].dob = _dob;
        peopleDetails[msg.sender].medicalCondition = _medicalCondition;
        peopleDetails[msg.sender].phoneNumber = _phoneNumber;
        peopleDetails[msg.sender].educationQualification = _educationQualification;
        peopleDetails[msg.sender].nativeCountry = _nativeCountry;
    }

    // Verify Person.
    function verifyPerson (
        address _personAddress
    ) public {
        for (uint i = 0; i < whiteListedAddresses.length; i++) {
            if (msg.sender == whiteListedAddresses[i]) {
                people[_personAddress].verified = true;
            }
        }
    }

    function approveBenefits (
        address beneficiaryAddress
    ) public returns(uint) {
        // 1. Find a location of the person and get the average living expenses
        // 2. Find the physical status, if normal return
        // 3. Find the different in their income and 
        // if  (people[beneficiaryAddress].verified == false) {
        //     return 0;
        // }

        if (peopleDetails[beneficiaryAddress].medicalCondition == PhysicalStatus.NORMAL) {
            return 0;
        }

        uint pinCode = peopleDetails[beneficiaryAddress].pinCode;
        uint averageExpense = pinCodes[pinCode].averageExpense;
        
        uint differentInExpense = averageExpense - peopleDetails[beneficiaryAddress].income;
        return differentInExpense;
    }

    function isAdmin () public returns(bool) {
        for (uint i = 0; i < whiteListedAddresses.length; i++) {
            if (msg.sender == whiteListedAddresses[i]) {
                return true;
            }
        }
        return false;
    }
}
