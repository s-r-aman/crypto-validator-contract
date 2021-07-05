export enum PhysicalStatus {
	NORMAL,
	PARTIALLY_PHYSICALLY_CHALLENGED,
	COMPLETELY_PHYSICALLY_CHALLENGED
}

export type Person = {
	firstName: string;
	lastName: string;
	email: string;
	verified?: boolean;
	benefitsGiven?: boolean;
}

export type PersonDetails = {
  income: number;
  dob: Date;
  medicalCondition: PhysicalStatus;
  phoneNumber: string;
  pinCode: number;
  educationQualification: string;
  nativeCountry: string;
}

export type PersonData = Person & PersonDetails;

export type Drizzle = {
	contracts: {
		Validator: {
			methods: {
				people: (address: string) => {call: () => Promise<Person>} 
				peopleDetails: (address: string) => {call: () => Promise<PersonDetails>} 
				isAdmin: () => {call: () => Promise<boolean>} 
				peopleCount: () => {call: () => Promise<number>} 
				peopleAddress: (count: number) => {call: () => Promise<string>} 
				createPerson: (firstName: string, lastName: string, email: string) => {send: () => Promise<null>} 
				addDetails: (income: string, dob: number, medicalCondition: 0 | 1 | 2, phoneNumber: string, pinCode: number, educationQualification: string, nativeCountry: string) => {send: () => Promise<null>} 
				verifyPerson: (address: string) => {send: () => Promise<null>} 
			}
		}
	}
}

export type DrizzleState = {
	accounts: string[];
}