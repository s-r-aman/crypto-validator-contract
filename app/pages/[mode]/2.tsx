import { Box, Container, Heading } from '@chakra-ui/layout'
import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  InputGroup,
  InputAddon,
  Text,
  Select,
} from "@chakra-ui/react"
import Head from 'next/head'
import { useForm } from "react-hook-form";
import { useGlobalState } from '../../state';
import { useRouter } from 'next/router';
import { PersonDetails } from '../../types';
import { format } from 'date-fns/esm';

const ErrorMessage = (props) => {
  return <Text color="red" py={4}>{props.children}</Text>
}

export default function RegisterPage3() {
  const [shouldRegister, setShouldRegister] = React.useState(false);
  const {addPersonDetails, startRegistration, updateRegistration, drizzle, person, personDetails} = useGlobalState();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<PersonDetails>({defaultValues: router.query.mode === 'update' ? {...personDetails, dob: typeof personDetails.dob === 'string' ? format(parseInt(personDetails.dob), 'YYY-MM-dd') : format(personDetails.dob, 'YYY-MM-dd')} : undefined});
  const onSubmit = (data: PersonDetails) => {
    addPersonDetails(data.income, new Date(data.dob), data.medicalCondition, data.phoneNumber, data.educationQualification, data.pinCode, data.nativeCountry);
    setShouldRegister(true);
  }
  
  console.log(errors)

  React.useEffect(() => {
    if (personDetails?.dob && shouldRegister) {
      if (router.query.mode === 'register') {
        console.log(person, personDetails)
        startRegistration(drizzle, person, personDetails).then((data) => {console.log(data); router.push('/')});
      } else {
        updateRegistration(drizzle, person, personDetails).then((data) => {console.log(data); router.push('/')});
      }
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
          <InputGroup>
            <InputAddon>₹</InputAddon>
            <Input borderLeftRadius={0} type="number" name="income" id="income" {...register('income', { required: true })}/>
          </InputGroup>
          <FormErrorMessage>{errors.income}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="dob" isRequired>
          <FormLabel htmlFor="dob">Date of Birth:</FormLabel>
          <Input type="date" name="dob" id="lastName"  {...register('dob', { required: true })}/>
          <FormErrorMessage>{errors.dob}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="medicalCondition" isRequired>
          <FormLabel>Physical Condition:</FormLabel>
          <Select {...register('medicalCondition')}>
            <option value="0">Normal</option>
            <option value="1">Partially Handicapped</option>
            <option value="2">Completely Handicapped</option>
          </Select>
          <FormErrorMessage>{errors.medicalCondition}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="phoneNumber" isRequired>
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
          <InputAddon>+91</InputAddon>
          <Input borderLeftRadius={0} isInvalid={!!errors.phoneNumber} type="number" minLength={10} maxLength={10} {...register('phoneNumber', { required: true, maxLength: 10, minLength: 10 })} />
          </InputGroup>
          {errors.phoneNumber && <ErrorMessage>Please enter a valid phone number. (10 digits))</ErrorMessage>}
        </FormControl>
        <FormControl mt={5} id="educationalQualifications" isRequired>
          <FormLabel>Education</FormLabel>
          <Select {...register('educationQualification', { required: true })} >
            <option value='Degree'>Degree</option>
            <option value='Illiterate'>Illiterate</option>
            <option value='High School'>High School</option>
            <option value='12th'>12th</option>
            <option value='Masters'>Masters</option>
            <option value='Phd'>Phd</option>
          </Select>
          <FormErrorMessage>{errors.educationQualification}</FormErrorMessage>
        </FormControl>
        <FormControl mt={5} id="pinCode" isRequired>
          <FormLabel>Pin Code:</FormLabel>
          <Input type="number" {...register('pinCode', { required: true, maxLength: 6, minLength: 6 })} />
          {errors.pinCode && <ErrorMessage>Please enter a valid pin code. (6 digits)</ErrorMessage>}
        </FormControl>
        <FormControl mt={5} id="nativeCountry" isRequired>
          <FormLabel>Citizenship:</FormLabel>
          <Select {...register('nativeCountry', { required: true })}>
            <option value="native">Native</option>
            <option value="immigrant">Immigrant</option>
          </Select>
          <FormErrorMessage>{errors.nativeCountry}</FormErrorMessage>
        </FormControl>
        <Button onClick={goBack} type="button" size="lg" mr={5} my={5}>Back</Button>
        <Button type="submit" colorScheme="blue" size="lg" my={5} >{router.query.mode === 'register' ? 'Complete' : 'Update'} Registration</Button>
        </Box>
      </Container>
    </>
  )
}
