
import React, { useState, useEffect } from 'react'

export default function useLocalStorage(key, fallbackValue) {
    const [value, setValue] = useState(fallbackValue);

    // if (key==='content') {console.log(value)}


    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(key));
        // console.log(localStorage)
        if (stored && stored !== undefined) {
            setValue(stored);
            // console.log('got')
        }
        // console.log('update 1', stored !== undefined ? JSON.parse(stored) : fallbackValue)
    }, []);

    useEffect(() => {
        if (value && value !== fallbackValue) {
            localStorage.setItem(key, JSON.stringify(value))
            // console.log('setted')

            // console.log('update 2', value)
        }
    }, [value]);

    return [value, setValue];
}