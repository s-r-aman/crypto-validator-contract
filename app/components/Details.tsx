import { Box, Checkbox, Heading, VStack } from '@chakra-ui/react';
import React from 'react'
import { useGlobalState } from '../state'

function givePhysicalStatus (a: 0 | 1 | 2 | '0' | '1' | '2') {
	switch (a) {
		case 0 || '0':
			return 'Normal'; 
		case 1 || '1':
			return 'Partially Handicapped';
		case 2 || '2':
			return 'Completely Handicapped';
		
	}
}

function Details() {
	const {person, personDetails} = useGlobalState();
	return person?.email && (
		<VStack mt={4} w="100%" alignItems="flex-start">
			<Box>Email: {person.email}</Box>	
			<Box>First Name: {person.firstName}</Box>	
			<Box>Last Name: {person.lastName}</Box>	
			<Box>Date of birth: {personDetails.dob}</Box>	
			<Box>Income: {personDetails.income}</Box>	
			<Box>Medical Condition: {givePhysicalStatus(personDetails.medicalCondition)}</Box>	
			<Box>Phone Number: {personDetails.phoneNumber}</Box>	
			<Box>Pin Code: {personDetails.pinCode}</Box>	
			<Box>Citizenship: {personDetails.nativeCountry}</Box>	
			<Checkbox size="lg" disabled isChecked={person.verified}>Verified</Checkbox>	
			<Checkbox size="lg" disabled isChecked={person.benefitsGiven}>Benefits Given</Checkbox>	
		</VStack>
	)
}

export default Details
