import { gql } from "@apollo/client";

export const GET_INBOUNDORDERS = gql`
  query getInboundOrders($filter: String, $first: Int, $after: String) {
    inboundOrders(filter: $filter, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          date
          note
          totalPrice
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
  query getInboundOrdersWithItems($filter: String, $first: Int, $after: String) {
    inboundOrders(filter: $filter, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          date
          note
          totalPrice
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
      totalPrice
    }
  }
`;

export const GET_INBOUNDORDER_WITH_ITEM = gql`
  query getInboundOrderWithItems($id: ID!) {
    inboundOrder(id: $id) {
      id
      date
      note
      totalPrice
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
        totalPrice
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
        totalPrice
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

export const CREATE_ORDERITEM = gql`
  mutation createOrderItem($input: CreateOrderItemInput!) {
    createOrderItem(input: $input) {
      orderItem {
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

export const UPDATE_ORDERITEM = gql`
  mutation updateOrderItem($input: UpdateOrderItemInput!) {
    updateOrderItem(input: $input) {
      orderItem {
        id
        product {
          id
        }
        quantity
        unitPrice
      }
    }
  }
`;
