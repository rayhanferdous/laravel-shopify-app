import { Page } from "@shopify/polaris";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Page title="Product index page">
            <div>
                <div className="text-red-500 ">Home component</div>
                <Link to={`/test`}>Test component</Link>
            </div>
        </Page>
    );
};

export default Home;
