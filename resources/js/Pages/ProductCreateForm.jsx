import {
    Button,
    Card,
    FormLayout,
    Frame,
    Link,
    TextField,
} from "@shopify/polaris";
import React, { useState } from "react";

export default function ProductCreateForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [productType, setProductType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        price: "",
        productType: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const createProduct = async (input) => {
        const response = await fetch("/store-product", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ input }),
        });
        const data = await response.json();
        return data;
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setErrors({
            title: "",
            description: "",
            price: "",
            productType: "",
        });
        setErrorMessage("");

        let hasError = false;
        const newErrors = {};

        if (!title) {
            newErrors.title = "Product title is required.";
            hasError = true;
        }
        if (!description) {
            newErrors.description = "Product description is required.";
            hasError = true;
        }
        if (!price || isNaN(price) || parseFloat(price) <= 0) {
            newErrors.price = "Price must be a valid positive number.";
            hasError = true;
        }
        if (!productType) {
            newErrors.productType = "Product type is required.";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        const productInput = {
            title,
            descriptionHtml: description,
            variants: [
                {
                    price,
                    sku: `${title
                        .replace(" ", "-")
                        .toLowerCase()}-${Date.now()}`,
                },
            ],
            productType,
        };

        try {
            const response = await createProduct(productInput);
            if (response.error) {
                setErrorMessage(response.error);
            } else {
                alert("Product created successfully!");
            }
        } catch (err) {
            setErrorMessage("Something went wrong while creating the product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Link to="/products">Products Page</Link>
            <Frame>
                <Card title="Create a New Product">
                    <FormLayout>
                        <TextField
                            label="Product Title"
                            value={title}
                            onChange={setTitle}
                            error={errors.title}
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={setDescription}
                            multiline
                            error={errors.description}
                        />
                        <TextField
                            label="Price"
                            value={price}
                            onChange={setPrice}
                            type="number"
                            error={errors.price}
                        />
                        <TextField
                            label="Product Type"
                            value={productType}
                            onChange={setProductType}
                            error={errors.productType}
                        />
                        {errorMessage && (
                            <div style={{ color: "red" }}>{errorMessage}</div>
                        )}
                        <Button
                            onClick={handleSubmit}
                            primary
                            loading={isSubmitting}
                        >
                            Create Product
                        </Button>
                    </FormLayout>
                </Card>
            </Frame>
        </>
    );
}
