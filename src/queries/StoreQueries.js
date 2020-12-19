import { gql } from "@apollo/client";

export const GET_STORES = gql`
  query getStores($filter: String, $after: String, $first: Int) {
    stores(filter: $filter, after: $after, first: $first) {
      edges {
        cursor
        node {
          id
          name
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

export const GET_STORE = gql`
  query getStore($id: ID!) {
    store(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_STORE = gql`
  mutation createStore($input: CreateStoreInput!) {
    createStore(input: $input) {
      store {
        id
        name
      }
    }
  }
`;

export const UPDATE_STORE = gql`
  mutation updateStore($input: UpdateStoreInput!) {
    updateStore(input: $input) {
      store {
        id
        name
      }
    }
  }
`;

export const DELETE_STORE = gql`
  mutation deleteStore($input: DeleteStoreInput!) {
    deleteStore(input: $input) {
      message
    }
  }
`;
