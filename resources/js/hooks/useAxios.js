import { useAppBridge, useNavigate } from "@shopify/app-bridge-react"
import axios from "axios"
import { useEffect } from "react"
import { getSessionToken } from '@shopify/app-bridge/utilities'

const useAxios = () => {
    const app = useAppBridge();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        const interceptor = axios.interceptors.request.use(function (config) {
            return getSessionToken(app).then(token => {
                config.headers.Authorization = `Bearer ${token}`
                config.params = {...config.params, host: window.__SHOPIFY_HOST}
                return config;
            })
        })

        const responseInterceptor = axios.interceptors.response.use( response => response, error => {
            if(error.response.status === 403 && error.response?.data?.forceRedirectUrl) {
                navigate(error.response.data.forceRedirectUrl)
            }
            return Promise.reject(error);
        })

        return () => {
            axios.interceptors.request.eject(interceptor)
            axios.interceptors.response.eject(responseInterceptor)
        } 
    }, [])
    return {axios}
}

export default useAxios