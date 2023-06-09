import { createContext, useMemo, useState } from "react";
import { getContactById } from "../Apis/FireStoreApi";

export const StateContext = createContext()

const StateContextProvider = ({children}) => {
    const [menuActive, setMenuActive] = useState(false)
    const [searchContact, setSearchContact] = useState('')

    const data = {menuActive, setMenuActive,searchContact, setSearchContact}

    return (
        <StateContext.Provider value={data}>

            {children}

        </StateContext.Provider>
    )

}

export default StateContextProvider