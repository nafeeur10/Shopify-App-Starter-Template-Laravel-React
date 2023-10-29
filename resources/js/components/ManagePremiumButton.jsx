import { Button, Toast } from "@shopify/polaris";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "@shopify/app-bridge-react";

const ManagePremiumButton = ({ hasPremium, icon }) => {
    const [loading, setLoading] = useState(false);
    const { axios } = useAxios();
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();

    const togglePremium = () => {
        setLoading(true);

        const promise = hasPremium
            ? axios.delete("/premium")
            : axios.post("/premium");

        promise
            .then((response) => {
                if (response.data.redirectUrl) {
                    navigate(response.data.redirectUrl);
                }
            })
            .catch(() => {
                setLoading(false);

                setToastMessage("Failed to upgrade to premium");
            });
    };

    return (
        <>
            <Button
                primary={!hasPremium}
                onClick={togglePremium}
                loading={loading}
                icon={icon}
            >
                {hasPremium ? "Downgrade to FREE" : "Upgrade to Premium"}
            </Button>
            {toastMessage && (
                <Toast
                    content={toastMessage}
                    onDismiss={() => setToastMessage("")}
                />
            )}
        </>
    );
};

export default ManagePremiumButton;
