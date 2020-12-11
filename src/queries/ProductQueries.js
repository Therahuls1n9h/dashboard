import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts($filter: String, $after: String, $first: Int) {
    products(filter: $filter, after: $after, first: $first) {
      edges {
        cursor
        node {
          id
          name
          sku
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
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
