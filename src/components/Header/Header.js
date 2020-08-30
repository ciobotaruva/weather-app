import React from 'react';
import { WiDaySunnyOvercast } from "react-icons/wi";

export default function Header() {
    return (
        <header className="App-header">
            <WiDaySunnyOvercast className="App-logo" />
            <h1>Weather Application</h1>
        </header>
    )
}