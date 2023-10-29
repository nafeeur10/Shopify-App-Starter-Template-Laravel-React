import { Button, Toast } from '@shopify/polaris';
import { useState }      from 'react';
import useAxios          from '../hooks/useAxios';

const DeleteFakeDataButton = () => {
    const [loading, setLoading]           = useState(false)
    const {axios}                         = useAxios()
    const [toastMessage, setToastMessage] = useState('')

    const deleteFakeData = () => {
        setLoading(true)

        axios.delete('/fake-data').then(() => {
            setLoading(false)

            setToastMessage('Deleting Fake Data')
        }).catch(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <Button destructive onClick={ deleteFakeData } loading={ loading }>Delete Fake Data</Button>
            { toastMessage && <Toast content={ toastMessage } onDismiss={ () => setToastMessage('') } /> }
        </>
    )
}

export default DeleteFakeDataButton