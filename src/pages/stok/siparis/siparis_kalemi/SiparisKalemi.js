import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { useApolloClient } from "@apollo/client";
import { GET_PRODUCTS, GET_PRODUCT } from "../../../../queries/ProductQueries";

import { TableCell, TableRow, Button, Input } from "@windmill/react-ui";

import { TrashIcon, CheckIcon } from "../../../../icons";

export default function SiparisKalemi({ orderItem, onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    getValues,
    setValue,
    formState: { isSubmitSuccessful }
  } = useForm();
  const watchFields = watch(["quantity", "unitPrice"]);
  const [totalPrice, setTotalPrice] = useState(true);

  const client = useApolloClient();

  const fetchProducts = async (input, cb) => {
    if (input && input.trim().length < 4) {
      return [];
    }
    const res = await client.query({
      query: GET_PRODUCTS,
      variables: { filter: "%" + input + "%" }
    });

    if (res.data && res.data.products.edges) {
      return res.data.products.edges.map((p) => ({
        value: p.node.id,
        label: p.node.name
      }));
    }

    return [];
  };

  const fetchProductChange = async () => {
    const product = getValues("product");

    if (!product || !product?.value) {
      return;
    }

    const res = await client.query({
      query: GET_PRODUCT,
      variables: { id: product.value }
    });

    if (res.data && res.data.product) {
      setValue("unitPrice", res.data.product.lastPrice);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ id: null, product: null, quantity: null, unitPrice: null });
    }
  }, [isSubmitSuccessful, reset, orderItem]);

  useEffect(() => {
    const quantity = getValues("quantity");
    const unitPrice = getValues("unitPrice");
    if (quantity && unitPrice) {
      setTotalPrice(quantity * unitPrice);
    } else {
      setTotalPrice(null);
    }
  }, [watchFields, getValues]);

  return (
    <>
      <TableRow key={orderItem?.id}>
        <TableCell className="w-2/6">
          <div className="flex items-center text-sm">
            <Input
              type="hidden"
              ref={register}
              name="id"
              value={orderItem?.id}
            />
            {!orderItem?.product && (
              <Controller
                as={AsyncSelect}
                name="product"
                className="mt-1 w-full"
                control={control}
                onChange={([selected]) => {
                  // React Select return object instead of value for selection
                  return { value: selected };
                }}
                cacheOptions
                loadOptions={fetchProducts}
                defaultOptions
                onInputChange={fetchProductChange}
                blurInputOnSelect={true}
              />
            )}
            {orderItem?.product && (
              <Input
                name="product"
                className="mt-1 w-full"
                disabled={true}
                defaultValue={orderItem?.product?.name}
              />
            )}
          </div>
        </TableCell>
        <TableCell className="w-1/6">
          <div className="flex items-center text-sm">
            <Input
              name="quantity"
              className="mt-1"
              ref={register}
              defaultValue={orderItem?.quantity}
            />
          </div>
        </TableCell>
        <TableCell className="w-1/6">
          <div className="flex items-center text-sm">
            <Input
              name="unitPrice"
              className="mt-1"
              ref={register}
              defaultValue={orderItem?.unitPrice}
            />
          </div>
        </TableCell>
        <TableCell className="w-1/6">
          <span className="text-sm">{totalPrice}</span>
        </TableCell>
        <TableCell className="w-1/6">
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleSubmit(onSubmit)}
              layout="link"
              size="icon"
              aria-label="Save"
            >
              <CheckIcon className="w-5 h-5" aria-hidden="true" />
            </Button>
            <Button
              onClick={() => {
                alert(orderItem?.id);
              }}
              layout="link"
              size="icon"
              aria-label="Delete"
            >
              <TrashIcon className="w-5 h-5" aria-hidden="true" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
