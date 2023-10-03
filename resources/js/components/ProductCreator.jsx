import { useCallback, useState } from "react";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import { Button, FormLayout, Layout, RangeSlider } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge/utilities";

const ProductCreator = () => {
    // const { axios } = useAxios();
    const [options, setOptions] = useState({ count: 5 });
    const app = useAppBridge();

    const handleCountChange = useCallback(
        (value) =>
            setOptions((prevOptions) => ({ ...prevOptions, count: value })),
        []
    );

    const createProducts = useCallback(() => {
        console.log("Calling--------------");
        axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

        // Add a request interceptor
        let ax = axios.interceptors.request.use(function (config) {
                return getSessionToken(app).then((token) => {
                    config.headers.Authorization = `Bearer ${token}`
                    console.log(token);
                    return config;
                })
                return config;
            },
            function (error) {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        // Add a response interceptor
        axios.interceptors.response.use(
            function (response) {
                return response;
            },
            function (error) {
                return Promise.reject(error);
            }
        );

        // axios.interceptors.request.use(function (config) {
        //     console.log("Inside interceptors-----------");
        //     return getSessionToken(app).then((token) => {
        //         console.log("Token------------------");
        //         console.log(token);
        //         config.headers.Authorization = `Bearer ${token}`;
        //         return config;
        //     });
        // });
        axios.post("/products", options).then(response => {
            console.log("After calling post request--------------");
            console.log(response)
        })
    });

    return (
        <Layout>
            <Layout.Section>
                <FormLayout>
                    <RangeSlider
                        output
                        label={`Number of Products ${
                            options.productsCount > 0
                                ? "(" + options.productsCount + ")"
                                : ""
                        }`}
                        min={0}
                        max={100}
                        step={5}
                        value={options.count}
                        onChange={handleCountChange}
                        id="productsCount"
                    />
                    <Button primary size="large" onClick={createProducts}>
                        Generate {options.count} Products
                    </Button>
                </FormLayout>
            </Layout.Section>
        </Layout>
    );
};

export default ProductCreator;
