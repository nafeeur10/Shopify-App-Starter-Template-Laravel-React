import { useCallback, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Layout, RangeSlider } from "@shopify/polaris";

const ProductCreator = () => {
    const { axios } = useAxios();
    const [options, setOptions] = useState({ count: 5 });

    const handleCountChange = useCallback(
        (value, name) =>
            setOptions((prevOptions) => ({ ...prevOptions, [name]: value })),
        []
    );

    const createProducts = useCallback(() => {
        axios.post("/products", options).then(response => {
            console.log(response)
        })
    }, [options])

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
                    <Button
                        primary
                        size="large"
                        loading={creatingProducts}
                        onClick={createProducts}
                    >
                        Generate { options.count } Products
                    </Button>
                </FormLayout>
            </Layout.Section>
        </Layout>
    );
};
