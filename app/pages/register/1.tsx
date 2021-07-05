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
import { Person } from '../../types';

interface Form1Inputs {
  firstName: string;
  lastName: string;
  email: string;
}

export default function RegisterPage1() {
  const {addPerson, person} = useGlobalState();
  const { register, handleSubmit, formState: { errors } } = useForm<Person>({defaultValues: person});
  const router = useRouter();
  const onSubmit = (data: Form1Inputs) => {
    addPerson(data.firstName, data.lastName, data.email);
    router.push('/register/2');
  }
  return (
    <>
      <Head>
        <title>Register | Crypto Validator</title>
      </Head>
      <Container mt={5}>
        <Heading>Register</Heading>
        <Heading size="sm" mt={5}>Step 1</Heading>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt={5} id="firstName" isRequired>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input type="text" name="firstName" id="firstName" {...register('firstName', { required: true })}/>
          <FormErrorMessage>{errors.firstName}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="lastName" isRequired>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input type="text" name="lastName" id="lastName" {...register('lastName', { required: true })}/>
          <FormErrorMessage>{errors.lastName}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" {...register('email', { required: true })} />
          <FormHelperText>We'll never share your email.</FormHelperText>
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg" mt={5} >Next</Button>
        </Box>
      </Container>
    </>
  )
}
