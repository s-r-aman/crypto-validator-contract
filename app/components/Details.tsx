import { Box, Checkbox, VStack } from '@chakra-ui/react';
import React from 'react'
import { useGlobalState } from '../state'

function Details() {
	const {person} = useGlobalState();
	return person.email && (
		<VStack mt={4} w="100%" alignItems="flex-start">
			<Box>Email: {person.email}</Box>	
			<Box>First Name: {person.firstName}</Box>	
			<Box>Last Name: {person.lastName}</Box>	
			<Checkbox size="lg" disabled isChecked={person.verified}>Verified</Checkbox>	
			<Checkbox size="lg" disabled isChecked={person.benefitsGiven}>Benefits Given</Checkbox>	
		</VStack>
	)
}

export default Details
