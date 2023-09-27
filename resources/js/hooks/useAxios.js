import { useAppBridge } from "@shopify/app-bridge-react"
import axios from "axios"
import { useEffect } from "react"
import { getSessionToken } from '@shopify/app-bridge/utilities'

const useAxios = () => {
    const app = useAppBridge()
    useEffect(() => {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        const interceptor = axios.interceptors.request.use(function(config) {
            return getSessionToken(app).then(token => {
                config.headers.Authorization = `Bearer ${token}`
                return config;
            })
        })

        return axios.interceptors.request.eject(interceptor)
    }, [])
    return {axios}
}

export default useAxios