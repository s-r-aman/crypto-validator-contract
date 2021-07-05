import { Box, Container, Heading } from '@chakra-ui/layout'
import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react"
import Head from 'next/head'
import { useForm } from "react-hook-form";
import { useGlobalState } from '../../state';
import { useRouter } from 'next/router';
import { PersonDetails } from '../../types';

export default function RegisterPage1() {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonDetails>();
  const [shouldRegister, setShouldRegister] = React.useState(false);
  const {addPersonDetails, startRegistration, drizzle, person, personDetails} = useGlobalState();
  const router = useRouter();
  const onSubmit = (data: PersonDetails) => {
    addPersonDetails(data.income, new Date(data.dob), data.medicalCondition, data.phoneNumber, data.educationQualification, data.pinCode, data.nativeCountry);
    setShouldRegister(true);
  }

  console.log(personDetails, shouldRegister, person)
  
  React.useEffect(() => {
    if (personDetails?.dob && shouldRegister) {
      console.log()
      startRegistration(drizzle, person, personDetails).then((data) => {console.log(data); router.push('/')});
    }
  }, [personDetails?.dob, shouldRegister])

  const goBack = () => {
    router.back()
  }
  
  return (
    <>
      <Head>
        <title>Register | Crypto Validator</title>
      </Head>
      <Container mt={5}>
        <Heading>Register</Heading>
        <Heading size="sm" mt={5}>Step 2</Heading>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt={5} id="income" isRequired>
          <FormLabel htmlFor="income">Income</FormLabel>
          <Input type="number" name="income" id="income" {...register('income', { required: true })}/>
          <FormErrorMessage>{errors.income}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="dob" isRequired>
          <FormLabel htmlFor="dob">Date of Birth:</FormLabel>
          <Input type="date" name="dob" id="lastName" {...register('dob', { required: true })}/>
          <FormErrorMessage>{errors.dob}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="medicalCondition" isRequired>
          <FormLabel>Medical Condition</FormLabel>
          <Input type="text" {...register('medicalCondition', { required: true })} />
          <FormErrorMessage>{errors.medicalCondition}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="phoneNumber" isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input type="number" {...register('phoneNumber', { required: true })} />
          <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="educationalQualifications" isRequired>
          <FormLabel>Education</FormLabel>
          <Input type="text" {...register('educationQualification', { required: true })} />
          <FormErrorMessage>{errors.educationQualification}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="pinCode" isRequired>
          <FormLabel>PinCode:</FormLabel>
          <Input type="number" {...register('pinCode', { required: true })} />
          <FormErrorMessage>{errors.pinCode}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="nativeCountry" isRequired>
          <FormLabel>CitizenShip:</FormLabel>
          <Input type="text" {...register('nativeCountry', { required: true })} />
          <FormErrorMessage>{errors.nativeCountry}</FormErrorMessage>
        </FormControl>
        <Button onClick={goBack} type="button" size="lg" mr={5} mt={5}>Back</Button>
        <Button type="submit" colorScheme="blue" size="lg" mt={5} >Complete Registration</Button>
        </Box>
      </Container>
    </>
  )
}
