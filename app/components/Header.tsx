import React from 'react'
import NextLink from 'next/link'
import { useGlobalState } from '../state'
import { Box, Heading, Link } from "@chakra-ui/react"

function Header() {
	const {drizzle, drizzleState} = useGlobalState();

	return (
		<>
		<Box w="100%" pos="fixed" top="0" display="flex" justifyContent="space-between" background="blue.700" py={5} px={10} color="white">
			<Link as={NextLink} href="/">
				<Heading size="md">Crypto Validator</Heading>
			</Link>
			<Heading size="md">Address: {drizzleState.accounts['0']}</Heading>
		</Box>
		<Box height="100px" />
		</>
	)
}

export default Header
