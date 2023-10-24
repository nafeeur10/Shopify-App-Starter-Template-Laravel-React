import { useCallback, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Button, FormLayout, Layout, RangeSlider } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import ValidationErrorBanner from "./ValidationErrorBanner";

const ProductCreator = () => {
    const { axios } = useAxios();
    const [options, setOptions] = useState({ count: 5 });
    const app = useAppBridge();
    const [errors, setErrors] = useState([]);
    const [creatingProducts, setCreatingProucts] = useState(false)

    const handleCountChange = useCallback(
        (value) =>
            setOptions((prevOptions) => ({ ...prevOptions, count: value })),
        []
    );

    const createProducts = useCallback(() => {
        setCreatingProucts(true)
        setErrors([])
        axios.post("/products", options).then(response => {
            setCreatingProucts(false)
        }).catch( error => {
            setCreatingProucts(false)
            if(error?.response?.status === 422) {
                setErrors(Object.values(error.response.data.errors || {}).flatMap(errors => errors));
            }
        })
    }, [options]);

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
                    <Button primary size="large" onClick={createProducts} loading={creatingProducts}>
                        Generate {options.count} Products
                    </Button>
                    { errors.length && <ValidationErrorBanner title="Failed to Create Products" errors={errors} onDismiss={() => setErrors([])}/>
                    }
                </FormLayout>
            </Layout.Section>
        </Layout>
    );
};

export default ProductCreator;
