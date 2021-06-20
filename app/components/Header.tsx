import React from 'react'
import { useGlobalState } from '../state'
import { Box, Heading } from "@chakra-ui/react"

function Header() {
	const {drizzle, drizzleState} = useGlobalState();

	return (
		<>
		<Box w="100%" pos="fixed" top="0" display="flex" justifyContent="space-between" background="blue.700" py={5} px={10} color="white">
			<Heading size="md">Crypto Validator</Heading>
			<Heading size="md">Address: {drizzleState.accounts['0']}</Heading>
		</Box>
		<Box height="100px" />
		</>
	)
}

export default Header
