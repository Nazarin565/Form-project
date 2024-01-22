import React, { useContext } from "react";
import './App.css'
import { Context } from "./ChangeLanguage";

export default function Header() {

    const difLang = useContext(Context)
    
    return (
        <header>
            {difLang.language}
            <button className="language" title="en/ua" onClick={() => {difLang.setLanguage && difLang.setLanguage(difLang.language === 'Hello world' ? 'Привіт світе' : 'Hello world') }}>Language</button>
            </header >
    )
}