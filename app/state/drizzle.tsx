import { DrizzleContext } from '@drizzle/react-plugin'
import { useContext } from 'react';

export const useDrizzle = () => useContext(DrizzleContext);
