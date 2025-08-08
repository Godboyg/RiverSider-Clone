import { createContext ,useContext , useState } from "react";

export const SharedStateContext = createContext();

export const SharedStateProvider = (props) => {
    const [ boolValue, setBoolValue ] = useState(false);
    const[size , setSize] = useState(false);
    
    const changeSize = () => {
        setSize(!size);
    }

    return (
        <SharedStateContext.Provider
         value={{ 
            boolValue, 
            setBoolValue,
            size,
            changeSize 
         }}>
            {props.children}
        </SharedStateContext.Provider>
    )
}
