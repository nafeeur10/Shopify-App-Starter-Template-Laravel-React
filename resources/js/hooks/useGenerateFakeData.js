import { useState } from 'react';
import useAxios     from './useAxios';

const useGenerateFakeData = () => {
    const {axios}                         = useAxios()
    const [loading, setLoading]           = useState(false)
    const [errors, setErrors]             = useState([])
    const [toastMessage, setToastMessage] = useState('')

    const generate = options => {
        setLoading(true)

        axios.post('/fake-data', options).then(() => {
            setLoading(false)
            setErrors([])
            setToastMessage('Started Generating Fake Data')
        }).catch(error => {
            setLoading(false)

            if (error?.response?.status === 422) {
                setErrors(Object.values(error.response.data.errors || {}).flatMap(errors => errors))
            } else {
                setErrors(['Oops! Something went wrong. Please try again later.'])
            }
        })
    }

    const dismissToast  = () => setToastMessage('')
    const dismissErrors = () => setErrors([])

    return {
        generate,
        loading,
        toastMessage,
        errors,
        dismissErrors,
        dismissToast
    }
}

export default useGenerateFakeData