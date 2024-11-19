import { Card, Frame, Page, Text } from "@shopify/polaris";
import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
    return (
        <Frame>
            <Page title="Product page">
                <Card sectioned>
                    <div>
                        <Text variant="headingLg" as="p">
                            <p>This is the product page</p>
                        </Text>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <Link to="/">Home Page</Link>
                        <Link to="/create-product">Create Product Page</Link>
                    </div>
                </Card>
            </Page>
        </Frame>
    );
};

export default Product;
