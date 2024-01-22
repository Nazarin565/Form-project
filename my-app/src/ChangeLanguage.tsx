import React, { useState, createContext, useMemo } from "react";
import './App.css'

type ContextType = {
    language: string,
    setLanguage: React.Dispatch<React.SetStateAction<string>> | undefined
}



export const Context = createContext<ContextType>({
    language: 'Hello world',
    setLanguage: undefined
})

export default function ChangeLanguage ({children}: any) {
    const [language, setLanguage] = useState<string>('Hello world')
    const data = useMemo<ContextType>(() => {
        return {
            language,
            setLanguage,
        }
    }, [language])

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}