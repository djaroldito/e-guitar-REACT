import { useState } from "react"

export function useStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			return initialValue
		}
	})

	const setValue = (value) => {
        try {
			setStoredValue(value)
			localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.error(error)
		}
	}
	return [storedValue, setValue]
}
