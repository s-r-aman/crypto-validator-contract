import { useState } from 'react';
import { createContext, useContext } from "react";
import { Drizzle, DrizzleState, Person, PersonData, PersonDetails, PhysicalStatus } from '../types';



interface IGlobalState {
	person?: Person;
	personDetails?: PersonDetails;
	allData?: PersonData;
	isAdmin?: boolean;
}

interface IGlobalContext extends IGlobalState {
	addPerson: (firstName: string, lastName: string, email: string) => void;	
	addPersonDetails: (income: number, dob: Date, medicationCondition: PhysicalStatus, phoneNumber: string, educationQualification: string, pinCode: number, nativeCountry: string) => void;	
	drizzle?: Drizzle;
	drizzleState?: DrizzleState;
	startRegistration: (drizzle: Drizzle, person: Person, personDetails: PersonDetails) => Promise<any>
	updateRegistration: (drizzle: Drizzle, person: Person, personDetails: PersonDetails) => Promise<any>
	updatePerson: (d: Person) => void;
	updateDetails: (d: PersonDetails) => void;
	isAdmin?: boolean;
	makeAdmin: () => void;
}

const Context = createContext<IGlobalContext>({
	addPerson: () => {},
	addPersonDetails: () => {},
	startRegistration: async (drizzle: any) => {},
	updateRegistration: async (drizzle: any) => {},
	updateDetails: () => {},
	updatePerson: () => {},
	makeAdmin: () => {},
	isAdmin: false
})

export const Provider = ({children, drizzle, drizzleState}) => {
	const [state, setState] = useState<IGlobalState>({});
	
	const addPerson = (firstName: string, lastName: string, email: string) => {
		setState((prev) => ({...prev, person: {firstName, lastName, email}}))
	}

	const addPersonDetails = (income: number, dob: Date, medicalCondition: PhysicalStatus, phoneNumber: string, educationQualification: string, pinCode: number, nativeCountry: string,) => {
		setState((prev) => ({...prev, personDetails: {income, dob, medicalCondition, educationQualification, nativeCountry, phoneNumber, pinCode}}))
	}

	const startRegistration = async (drizzle: Drizzle, person: Person, personDetails: PersonDetails) => {
		const {dob, educationQualification, income, medicalCondition, nativeCountry, phoneNumber, pinCode} = personDetails;
		await drizzle.contracts.Validator.methods.createPerson(person.firstName, person.lastName, person.email).send();
		// @ts-expect-error
		await drizzle.contracts.Validator.methods.addDetails(income.toString(), dob.getTime(), medicalCondition, phoneNumber,pinCode, educationQualification, nativeCountry).send();
		return 'Done';
	}

	const updateRegistration = async (drizzle: Drizzle, person: Person, personDetails: PersonDetails) => {
		const {dob, educationQualification, income, medicalCondition, nativeCountry, phoneNumber, pinCode} = personDetails;
		await drizzle.contracts.Validator.methods.updatePerson(person.firstName, person.lastName, person.email).send();
		console.log(personDetails.nativeCountry)
		await drizzle.contracts.Validator.methods.updateDetails(income.toString(), dob.getTime(), medicalCondition, phoneNumber,pinCode, educationQualification, nativeCountry).send();
		return 'Done';
	}

	const updatePerson = (person: Person) => {
		setState((prev) => ({...prev, person: { ...prev.person, ...person}}));
	}

	const updateDetails = (personDetails: PersonDetails) => {
		setState((prev) => ({...prev, personDetails: { ...prev.personDetails, ...personDetails}}));
	}

	const makeAdmin = () => setState(prev => ({...prev, isAdmin: true}));
console.log(state)
	return <Context.Provider value={{...state, startRegistration, updatePerson, updateDetails, addPerson, addPersonDetails, drizzle, drizzleState, makeAdmin, updateRegistration}}>{children}</Context.Provider>
} 


export const useGlobalState = () => useContext(Context)
