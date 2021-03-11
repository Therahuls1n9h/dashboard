import React from "react";
import { useForm } from "react-hook-form";

import {
  Table,
  TableHeader,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Button,
  Input
} from "@windmill/react-ui";

import { EditIcon, TrashIcon, CheckIcon } from "../../../../icons";

export default function SiparisKalemi({ orderItem, onSubmit }) {
  const { register, handleSubmit, formState } = useForm();

  const onFormSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <TableRow key={orderItem?.id}>
        <TableCell>
          <div className="flex items-center text-sm">
            <Input
              type="hidden"
              ref={register}
              name="id"
              value={orderItem?.id}
            />
            <Input
              name="product"
              className="mt-1"
              ref={register}
              defaultValue={orderItem?.product.name}
            />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center text-sm">
            <Input
              name="quantity"
              className="mt-1"
              ref={register}
              defaultValue={orderItem?.quantity}
            />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center text-sm">
            <Input
              name="unitPrice"
              className="mt-1"
              ref={register}
              defaultValue={orderItem?.unitPrice}
            />
          </div>
        </TableCell>
        <TableCell>
          <span className="text-sm">
            {orderItem?.unitPrice * orderItem?.quantity}
          </span>
        </TableCell>
        <TableCell>
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
