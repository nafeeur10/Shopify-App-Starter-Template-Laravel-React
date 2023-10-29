import {
    Button,
    FormLayout,
    Frame,
    HorizontalGrid, Icon,
    Layout,
    Page,
    RangeSlider, SkeletonDisplayText,
    Toast,
    Tooltip,
    Text,
    HorizontalStack
}                                           from '@shopify/polaris'
import { useCallback, useEffect, useState } from 'react'
import ValidationErrorBanner                from './ValidationErrorBanner';
import DeleteFakeDataButton                 from './DeleteFakeDataButton';
import useGenerateFakeData                  from '../hooks/useGenerateFakeData';
import ManagePremiumButton                  from './ManagePremiumButton';
import useAxios                             from '../hooks/useAxios';
import { StarFilledMinor }                  from '@shopify/polaris-icons';

const FakeDataCreator = () => {
    const [options, setOptions]       = useState({
        productsCount: 0,
        customersCount: 0
    })
    const {
              generate,
              toastMessage,
              loading: creatingProducts,
              errors,
              dismissErrors,
              dismissToast
          }                           = useGenerateFakeData()
    const [hasPremium, setHasPremium] = useState(null)
    const {axios}                     = useAxios()

    useEffect(() => {
        axios.get('/premium').then(response => {
            setHasPremium(response.data.hasPremium)
        })
    }, [])

    const handleCountChange = useCallback(
        (value, name) => setOptions(prevOptions => ({...prevOptions, [name]: value})),
        []
    )

    const premiumIcon = <Icon source={ StarFilledMinor } color="success" />

    const primaryActionButtons = (
        <>
            <HorizontalGrid gap="2" columns="2">
                { hasPremium === null
                    ? <SkeletonDisplayText size="extraLarge" />
                    : <ManagePremiumButton hasPremium={ hasPremium } icon={ premiumIcon } /> }
                <DeleteFakeDataButton />
            </HorizontalGrid>
        </>
    )

    const customersLabel = (
        <HorizontalStack wrap={ false } gap="1">
            Number of Customers { options.customersCount > 0 ? '(' + options.customersCount + ')' : '' }
            { hasPremium ? null : (
                <Tooltip dismissOnMouseOut content="This feature is only available for premium plan.">
                    <Text fontWeight="bold" as="span">
                        { premiumIcon }
                    </Text>
                </Tooltip>
            ) }
        </HorizontalStack>
    )

    return (
        <Frame>
            <Page title="Generate Fake Data" primaryAction={ primaryActionButtons }>
                <Layout>
                    <Layout.Section>
                        <FormLayout>
                            <RangeSlider
                                output
                                label={ `Number of Products ${ options.productsCount > 0 ? '(' + options.productsCount + ')' : '' }` }
                                min={ 0 }
                                max={ 100 }
                                step={ 5 }
                                value={ options.productsCount }
                                onChange={ handleCountChange }
                                id="productsCount"
                            />
                            <RangeSlider
                                output
                                disabled={ ! hasPremium }
                                label={ customersLabel }
                                min={ 0 }
                                max={ 100 }
                                step={ 5 }
                                value={ options.customersCount }
                                onChange={ handleCountChange }
                                id="customersCount"
                            />
                            <Button primary size="large" loading={ creatingProducts }
                                    onClick={ () => generate(options) }>Generate</Button>
                            { toastMessage &&
                                <Toast content={ toastMessage } onDismiss={ dismissToast } /> }
                            { errors.length && (
                                <ValidationErrorBanner
                                    title="Failed to Generate Fake Data"
                                    errors={ errors }
                                    onDismiss={ dismissErrors }
                                />
                            ) }
                        </FormLayout>
                    </Layout.Section>
                </Layout>
            </Page>
        </Frame>
    )
}

export default FakeDataCreator