import { useState } from "react"

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config)

    const resData = await response.json()
    
    if(!response.ok) {
        throw new Error(
            resData.message || 'Something went wrong, failed to send request'
        )
    }

    return resData
}

export default function useHttp() {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    async function sendRequest() {
        setIsLoading(true)
        try {
            const resData = sendHttpRequest()
            setData(resData)
        } catch(error) {
            setError(error.message || 'Something went wrong!')
        }
        setIsLoading(false)
    }

    return {
        data,
        isLoading,
        error
    }

}