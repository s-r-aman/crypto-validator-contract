import { Box, Checkbox, Grid, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link'
import { format } from 'date-fns';
import React from 'react'
import { useGlobalState } from '../state'

function givePhysicalStatus (a: 0 | 1 | 2 | '0' | '1' | '2') {
	switch (a) {
		case 0:
		case '0':
			return 'Normal'; 
		case 1 :
		case '1':
			return 'Partially Handicapped';
		case 2:
		case '2':
			return 'Completely Handicapped';
	}
}

function Details ({amount}: {amount: number|string}) {
	const {person, personDetails} = useGlobalState();
	let dob = personDetails.dob;
	if (typeof dob === 'string') {
		dob = parseInt(dob);
	} 
	return person?.email && (
    <>
      <Grid templateColumns="1fr 1fr" gap={5} mt={4} w="100%" alignItems="flex-start">
        <Box>Email: </Box>
        <Box fontWeight="bold">{person.email}</Box>	
        <Box>First Name: </Box>
        <Box fontWeight="bold">{person.firstName}</Box>	
        <Box>Last Name: </Box>
        <Box fontWeight="bold">{person.lastName}</Box>	
        <Box>Date of birth: </Box>
        <Box fontWeight="bold">{format(dob, 'MMM dd,YYY')}</Box>	
        <Box>Income: </Box>
        <Box fontWeight="bold">₹ {personDetails.income}</Box>	
        <Box>Physical Condition: </Box>
        <Box fontWeight="bold">{givePhysicalStatus(personDetails.medicalCondition)}</Box>	
        <Box>Phone Number: </Box>
        <Box fontWeight="bold">{personDetails.phoneNumber}</Box>	
        <Box>Pin Code: </Box>
        <Box fontWeight="bold">{personDetails.pinCode}</Box>	
        <Box>Citizenship: </Box>
        <Box fontWeight="bold">{personDetails.nativeCountry}</Box>	
        <Checkbox size="lg" disabled isChecked={person.verified}>Verified</Checkbox>	
        <Checkbox size="lg" disabled isChecked={person.benefitsTransferred}>Benefits Transferred</Checkbox>	
        <Checkbox size="lg" disabled isChecked={person.isEligible}>Eligibility: ₹ {amount}</Checkbox>	
      </Grid>
      <Link href="/update">
        <Button width="100%" py={4} my={10} colorScheme="blue">
          Update
        </Button>
      </Link> 
    </>
	)
}

export default Details
