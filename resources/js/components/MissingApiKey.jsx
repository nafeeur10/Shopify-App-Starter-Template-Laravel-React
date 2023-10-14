import { Banner, Layout, Page } from "@shopify/polaris"

const MissingApiKey = () => {
    return (
        <Page>
            <Layout>
                <Layout.Section title="Shopify API Key is missing" status="critical">
                    <Banner>Shopify API Key is missing from the application</Banner>
                </Layout.Section>
            </Layout>
        </Page>
    )
}

export default MissingApiKey