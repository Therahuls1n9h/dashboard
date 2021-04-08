import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableContainer
} from "@windmill/react-ui";

import {
  UPDATE_ORDERITEM,
  CREATE_ORDERITEM,
  GET_INBOUNDORDER_WITH_ITEM
} from "../../../../queries/OrderQueries";

import SiparisKalemi from "./SiparisKalemi";

export default function SiparisKalemiDetay({ inboundOrder }) {
  // Update order item
  const [
    updateOrderItem,
    { loading: updateLoading, error: updateError, data: updateData }
  ] = useMutation(UPDATE_ORDERITEM);

  // Create new order item
  const [
    createOrderItem,
    { loading: createLoading, error: createError, data: createData }
  ] = useMutation(CREATE_ORDERITEM, {
    refetchQueries: [
      { query: GET_INBOUNDORDER_WITH_ITEM, variables: { id: inboundOrder.id } }
    ]
  });

  // TODO: On update function send only dirty fields to api server
  const onSubmit = (formData) => {
    if (formData.id) {
      updateOrderItem({
        variables: {
          input: {
            id: formData.id,
            quantity: formData.quantity,
            unitPrice: formData.unitPrice
          }
        }
      });
    } else {
      createOrderItem({
        variables: {
          input: {
            orderId: inboundOrder.id,
            productId: formData.product.value,
            quantity: formData.quantity,
            unitPrice: formData.unitPrice
          }
        }
      });
    }
  };

  return (
    <>
      <TableContainer className="mb-8 h-full">
        <Table className="h-auto">
          <TableHeader>
            <tr>
              <TableCell>Ürün</TableCell>
              <TableCell>Adet</TableCell>
              <TableCell>Birim Fiyat</TableCell>
              <TableCell>Tutar</TableCell>
              <TableCell>Onayla/Sil</TableCell>
            </tr>
          </TableHeader>
          <TableBody className="h-auto">
            <SiparisKalemi key={null} orderItem={null} onSubmit={onSubmit} />
            {inboundOrder?.items?.map((item) => (
              <SiparisKalemi
                key={item.id}
                orderItem={item}
                onSubmit={onSubmit}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
