import { createContext, useContext, } from 'react'

export const IndexContext = createContext({});
export const useIndexContext = () => useContext(IndexContext);

