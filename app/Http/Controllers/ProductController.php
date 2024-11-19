<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Shopify\Clients\GraphQL;

class ProductController extends Controller
{
    public function createProduct(Request $request)
    {
        dd($request->all());
        $input = $request->input('input');

        $client = new GraphQL(env('SHOPIFY_MYSHOPIFY_DOMAIN'), env('SHOPIFY_API_KEY'));

        // Build the GraphQL mutation
        $mutation = 'mutation {
            productCreate(input: {
                title: "'.$input['title'].'",
                bodyHtml: "'.$input['descriptionHtml'].'",
                productType: "'.$input['productType'].'",
                variants: [
                    {
                        price: "'.$input['variants'][0]['price'].'",
                        sku: "'.$input['variants'][0]['sku'].'"
                    }
                ]
            }) {
                product {
                    id
                    title
                }
                userErrors {
                    field
                    message
                }
            }
        }';

        try {
            $response = $client->query($mutation);
            if (isset($response['data']['productCreate']['userErrors']) && count($response['data']['productCreate']['userErrors']) > 0) {
                return response()->json(['errors' => $response['data']['productCreate']['userErrors']], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Product created successfully!',
                'product' => $response['data']['productCreate']['product'],
            ]);
        } catch (Exception $e) {
            return response()->json(['errors' => [['message' => 'Failed to create product: '.$e->getMessage()]]], 500);
        }
    }
}
