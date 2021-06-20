import { Box, VStack } from '@chakra-ui/react';
import React from 'react'
import { useGlobalState } from '../state'

function Details() {
	const {details} = useGlobalState();
	return details.email && (
		<VStack mt={4}>
			<Box>Email: {details.email}</Box>	
			<Box>First Name: {details.firstName}</Box>	
			<Box>Last Name: {details.lastName}</Box>	
		</VStack>
	)
}

export default Details
