
import React, { useState, useEffect } from 'react'

export default function useLocalStorage(key, fallbackValue) {
    const [value, setValue] = useState(null);

    // if (key==='content') {console.log(value)}


    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(key));
        // console.log(localStorage)
        if (stored && stored !== undefined) {
            setValue(stored);
            // console.log('got')
        }
        else {setValue(fallbackValue)}
        // console.log('update 1', stored !== undefined ? stored : fallbackValue)
        // console.log(stored)
        // console.log(key)
    }, [key]);

    useEffect(() => {
        if (value && value !== fallbackValue) {
            localStorage.setItem(key, JSON.stringify(value))
            // console.log('setted')
            // console.log('setted', value)
        }
    }, [value]);

    return [value, setValue];
}