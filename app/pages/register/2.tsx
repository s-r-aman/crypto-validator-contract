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

interface Form2Inputs {
  income: number;
  dob: Date;
  medicalCondition: string;
  phoneNumber: string;
  educationQualification: string;
  nativeCountry: string;
}

export default function RegisterPage1() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form2Inputs>();
  const {addFormStep2, startRegistration, drizzle} = useGlobalState();
  const router = useRouter();
  const onSubmit = (data: Form2Inputs) => {
    addFormStep2(data.income, new Date(data.dob), data.medicalCondition, data.phoneNumber, data.educationQualification, data.nativeCountry);
    startRegistration(drizzle).then((data) => {console.log(data); router.push('/')});
  }

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
        <FormControl mt={5} id="nativeCountry" isRequired>
          <FormLabel>Country:</FormLabel>
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
