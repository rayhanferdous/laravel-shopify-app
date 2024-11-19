import { Frame, Page } from "@shopify/polaris";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Frame>
            <Page title="Home page">
                <div>
                    <div className="text-red-500 ">This is home page</div>
                    <div className="flex flex-col gap-2 *:hover:underline !mt-5">
                        <Link to={`/products`}>Products Page</Link>
                        <Link to={`/create-product`}>Create Product Page</Link>
                    </div>
                </div>
            </Page>
        </Frame>
    );
};

export default Home;
