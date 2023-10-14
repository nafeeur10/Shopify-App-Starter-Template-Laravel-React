import { useAppBridge } from "@shopify/app-bridge-react"
import axios from "axios"
import { useEffect } from "react"
import { getSessionToken } from '@shopify/app-bridge/utilities'

const useAxios = () => {
    console.log("Clicking-------------")
    const app = useAppBridge()
    useEffect(() => {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        console.log("Clicking 2--------------")
        const interceptor = axios.interceptors.request.use(function (config) {
            return getSessionToken(app).then(token => {
                console.log("Token------------------")
                console.log(token);
                config.headers.Authorization = `Bearer ${token}`
                console.log("Config:--------------");
                console.log(config);
                return config;
            })
        })

        return axios.interceptors.request.eject(interceptor)
    }, [])
    return {axios}
}

export default useAxios