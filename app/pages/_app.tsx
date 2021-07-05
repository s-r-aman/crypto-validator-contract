import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "../state"
import ValidatorContract from './../contracts/Validator.json'
import { DrizzleContext } from '@drizzle/react-plugin'
import { Drizzle } from "@drizzle/store";
import Header from './../components/Header'

const options = {
  contracts: [ValidatorContract],
};

// Don't know much about options types.
// @ts-expect-error
const drizzle = new Drizzle(options);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {drizzleContext => {
            const {drizzle, drizzleState, initialized} = drizzleContext;
            if(!initialized) {
              return "Loading..."
            }
            
            console.log({drizzle, drizzleState});

            return (
              <Provider drizzle={drizzle} drizzleState={drizzleState}>
                <Header/>
                <Component {...pageProps} />
              </Provider>
            )
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
