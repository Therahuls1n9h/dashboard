import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id) {
      id
      name
      sku
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      product {
        id
        name
        sku
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      product {
        id
        name
        sku
      }
    }
  }
`;
