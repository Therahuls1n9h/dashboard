import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT
} from "../../../queries/ProductQueries";
import HUForm from "./HUForm";

// https://stackoverflow.com/a/61322784
// https://www.digitalocean.com/community/tutorials/how-to-call-web-apis-with-the-useeffect-hook-in-react
export default function HUEkleDuzenle() {
  // Get id parameter from URI
  const { id } = useParams();

  const history = useHistory();

  // Get product from server
  const [
    getProduct,
    { loading: queryLoading, error: queryError, data: queryData }
  ] = useLazyQuery(GET_PRODUCT);

  // Update product
  const [
    updateProduct,
    { loading: updateLoading, error: updateError, data: updateData }
  ] = useMutation(UPDATE_PRODUCT);

  // Create new product
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
    if (queryData) {
      setData({ ...queryData.product });
    }
  }, [queryData]);
  // Redirect to edit page. Search ApolloClient API, there should be better prop for this
  useEffect(() => {
    if (createData) {
      history.push(
        `/app/hizmet_ve_urunler/${createData.createProduct.product.id}/duzenle`
      );
      //setData({ ...createData.createProduct.product });
    }
  }, [createData]);
  useEffect(() => {
    if (updateData) {
      setData({ ...updateData.updateProduct.product });
    }
  }, [updateData]);

  useEffect(() => {
    if (!(createLoading || updateLoading)) {
      if (id && Object.keys(data).length === 0) {
        getProduct({
          variables: { id }
        });
      }
    }
  }, []);

  //if (queryLoading || createLoading || updateLoading) return <p>Loading...</p>;
  //if (queryError || createError || updateError) return <p>Error :(</p>;

  return <HUForm formDefaultValues={data} onSubmit={onSubmit} />;
}
