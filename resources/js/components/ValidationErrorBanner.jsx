import { Banner } from "@shopify/polaris"

const ValidationErrorBanner = ({errors, title, onDismiss}) => {
    return (
        <Banner 
            title={title}
            status="critical"
            onDismiss={onDismiss}
        >
            <ul>
                { errors.map((error, i) => <li key={ i }>{ error }</li>) }
            </ul>
        </Banner>
    )
}

export default ValidationErrorBanner