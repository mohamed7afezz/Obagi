import React, { createContext, useState, useEffect } from 'react';

const TempContext = createContext();

let temp = 'bahi';

export const TempProvider = ({children}) => {
    const [tempState, setTempState] = useState(temp);

    const updateTemp = (val) => {
        setTempState(val);
        privateFn();
    }

    const privateFn = () => {
        console.log('You can\'t call me out side the provider')
    }

    return (
        <TempContext.Provider value={{tempState, updateTemp}}>
            {children}
        </TempContext.Provider>
    )
}

export default TempContext;