pragma solidity ^0.8.5;

contract Validator {
    // Keeping the count of the people so that we know how many persons are registered.
    uint public peopleCount = 0;

    // The person blueprint.
    struct Person {
        uint id; // Unique identifier for the person to access.
        string firstName; // First Name of the person.
        string lastName; // Last Name of the person.
        string email; // Email of the person.
    }

    struct PersonDetails {
        string income; // in cents
        uint dob; // Date of birth, in integer UNIX time
        string medicalCondition; // Medical condition if any 
        string phoneNumber; // Phone number 
        string educationQualification; // Educational Qualification 
        string nativeCountry; // Native country
    }

    // Person mapping, to access an specific person.
    mapping(address => Person) public people;
    mapping(address => PersonDetails) public peopleDetails;
    mapping(uint => address) public peopleAddress;


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
            _email
        );
    }

    // Add details 
    function addDetails (
        string memory _income,
        uint _dob,
        string memory _medicalCondition,
        string memory _phoneNumber,
        string memory _educationQualification,
        string memory _nativeCountry
    ) public {
        peopleDetails[msg.sender] = PersonDetails(
            _income,
            _dob,
            _medicalCondition,
            _phoneNumber,
            _educationQualification,
            _nativeCountry
        );
    }
    
}
