import { useState } from 'react';
import { createContext, useContext } from "react";

export interface PersonDetails {
		lastName: string;
		email: string;
		income: number;
		dob: Date;
		medicalCondition: string;
		phoneNumber: string;
		educationQualification: string;
		nativeCountry: string;
		firstName: string;
}

interface IGlobalState {
	formValues1?: {
		firstName: string;
		lastName: string;
		email: string;
	};
	formValues2?: {
		income: number;
		dob: Date;
		medicalCondition: string;
		phoneNumber: string;
		educationQualification: string;
		nativeCountry: string;
	}
	details?: PersonDetails
}

interface IGlobalContext extends IGlobalState {
	addFormStep1: (firstName: string, lastName: string, email: string) => void;	
	addFormStep2: (income: number, dob: Date, medicationCondition: string, phoneNumber: string, educationQualification: string, nativeCountry: string) => void;	
	drizzle: {}
	drizzleState: {}
	startRegistration: (drizzle: any) => Promise<any>
	updateDetails: (d: PersonDetails) => void
}

const Context = createContext<IGlobalContext>({
	addFormStep1: () => {},
	addFormStep2: () => {},
	drizzle: {},
	drizzleState: {},
	startRegistration: async (drizzle: any) => {},
	updateDetails: () => {}
})

export const Provider = ({children, drizzle, drizzleState}) => {
	const [state, setState] = useState<IGlobalState>({});
	
	const addFormStep1 = (firstName: string, lastName: string, email: string) => {
		setState({formValues1: {firstName, lastName, email}})
	}

	const addFormStep2 = (income: number, dob: Date, medicalCondition: string, phoneNumber: string, educationQualification: string, nativeCountry: string) => {
		setState({formValues2: {income, dob, medicalCondition, educationQualification, nativeCountry, phoneNumber}})
	}

	const startRegistration = async (drizzle: any) => {
		const {dob, educationQualification, income, medicalCondition, nativeCountry, phoneNumber} = state.formValues2;
		await drizzle.contracts.Validator.methods.createPerson(state.formValues1.firstName, state.formValues1.lastName, state.formValues1.email).send();
		await drizzle.contracts.Validator.methods.createPerson(state).send(income, dob, medicalCondition, phoneNumber, educationQualification, nativeCountry);
		return 'Done';
	}

	const updateDetails = (details: PersonDetails) => {
		setState((prev) => ({...prev, details}));
	}

	return <Context.Provider value={{...state, startRegistration, updateDetails, addFormStep1, addFormStep2, drizzle, drizzleState}}>{children}</Context.Provider>
} 


export const useGlobalState = () => useContext(Context)
