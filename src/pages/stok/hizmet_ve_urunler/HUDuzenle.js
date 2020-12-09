import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT
} from "../../../queries/ProductQueries";
import HUEkleDuzenleForm from "./HUEkleDuzenleForm";

// https://stackoverflow.com/a/61322784
// https://www.digitalocean.com/community/tutorials/how-to-call-web-apis-with-the-useeffect-hook-in-react
export default function HUDuzenle() {
  // Get id parameter from URI
  const { id } = useParams();

  // Get product from server
  const [
    getProduct,
    { loading: queryLoading, error: queryError, data: queryData }
  ] = useLazyQuery(GET_PRODUCT, {
    variables: { id }
  });

  const [
    updateProduct,
    { loading: updateLoading, error: updateError, data: updateData }
  ] = useMutation(UPDATE_PRODUCT);

  const [
    createProduct,
    { loading: createLoading, error: createError, data: createData }
  ] = useMutation(CREATE_PRODUCT);

  // TODO: On update function send only dirty fields to api server
  const onSubmit = (formData) => {
    if (id) {
      updateProduct({ variables: { input: { id: id, ...formData } } });
    } else {
      createProduct({ variables: { input: { ...formData } } });
    }
  };

  const [data, setData] = useState({});
  useEffect(() => {
    if (queryData) setData({ ...queryData.product });
  }, [queryData]);
  useEffect(() => {
    if (createData) {
      console.log(createData);
      setData({ ...createData.createProduct.product });
    }
  }, [createData]);
  useEffect(() => {
    if (updateData) setData({ ...updateData.updateProduct.product });
  }, [updateData]);

  useEffect(() => {
    if (id) getProduct();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (queryLoading || createLoading || updateLoading) return <p>Loading...</p>;
  if (queryError || createError || updateError) return <p>Error :(</p>;

  return <HUEkleDuzenleForm formDefaultValues={data} onSubmit={onSubmit} />;
}
