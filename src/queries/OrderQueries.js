import { gql } from "@apollo/client";

export const GET_INBOUNDORDERS = gql`
  query getInboundOrders($filter: String, $first: Int, $after: ID) {
    inboundOrders(filter: $filter, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          date
          note
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

export const GET_INBOUNDORDERS_WITH_ITEMS = gql`
  query getInboundOrdersWithItems($filter: String, $first: Int, $after: ID) {
    inboundOrders(filter: $filter, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          date
          note
          items {
            id
            product {
              id
            }
            quantity
            unitPrice
          }
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

export const GET_INBOUNDORDER = gql`
  query getInboundOrder($id: ID!) {
    inboundOrder(id: $id) {
      id
      date
      note
    }
  }
`;

export const GET_INBOUNDORDER_WITH_ITEM = gql`
  query getInboundOrderWithItems($id: ID!) {
    inboundOrder(id: $id) {
      id
      date
      note
      items {
        id
        product {
          id
          name
          sku
        }
        quantity
        unitPrice
      }
    }
  }
`;

export const CREATE_INBOUNDORDER = gql`
  mutation createInboundOrder($input: CreateInboundOrderInput!) {
    createInboundOrder(input: $input) {
      inboundOrder {
        id
        date
        note
      }
    }
  }
`;

export const UPDATE_INBOUNDORDER = gql`
  mutation updateInboundOrder($input: UpdateInboundOrderInput!) {
    updateInboundOrder(input: $input) {
      inboundOrder {
        id
        date
        note
      }
    }
  }
`;

export const DELETE_INBOUNDORDER = gql`
  mutation deleteInboundOrder($input: ID!) {
    deleteInboundOrder(input: $input) {
      message
    }
  }
`;
