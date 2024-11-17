import { Page } from "@shopify/polaris";
import React from "react";
import { Link } from "react-router-dom";

const Test = () => {
    return (
        <Page title="Product Test page">
            <div>
                <div className="text-blue-500 ">Test component</div>
                <Link to={`/`}>Home component</Link>
            </div>
        </Page>
    );
};

export default Test;
