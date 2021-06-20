import { Container, Heading } from '@chakra-ui/layout'
import Head from 'next/head'
import Link from 'next/link'
import { DrizzleContext } from "@drizzle/react-plugin";

export default function Home() {
  return (
		<DrizzleContext.Consumer>
		{drizzleContext => {
			const {drizzle, drizzleState, initialized} = drizzleContext;
			console.log({drizzle, drizzleState, initialized})

			if(!initialized) {
				return "Loading..."
			}

			return (
				<p>Yay</p>
				)
			}}
	</DrizzleContext.Consumer>
  )
}
