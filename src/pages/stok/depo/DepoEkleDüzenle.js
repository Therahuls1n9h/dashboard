import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_STORE,
  UPDATE_STORE,
  CREATE_STORE
} from "../../../queries/StoreQueries";
import DepoForm from "./DepoForm";

export default function DepoEkleDuzenle() {
  // Get id parameter from URI
  const { id } = useParams();

  const history = useHistory();

  // Get store from server
  const [
    getStore,
    { loading: queryLoading, error: queryError, data: queryData }
  ] = useLazyQuery(GET_STORE);

  // Update store
  const [
    updateStore,
    { loading: updateLoading, error: updateError, data: updateData }
  ] = useMutation(UPDATE_STORE);

  // Create new store
  const [
    createStore,
    { loading: createLoading, error: createError, data: createData }
  ] = useMutation(CREATE_STORE);

  // TODO: On update function send only dirty fields to api server
  const onSubmit = (formData) => {
    if (id) {
      updateStore({ variables: { input: { id: id, ...formData } } });
    } else {
      createStore({ variables: { input: { ...formData } } });
    }
  };

  const [data, setData] = useState({});
  useEffect(() => {
    if (queryData) {
      setData({ ...queryData.store });
    }
  }, [queryData]);
  // Redirect to edit page. Search ApolloClient API, there should be better prop for this
  useEffect(() => {
    if (createData) {
      history.push(`/app/depo/${createData.createStore.store.id}/duzenle`);
      //setData({ ...createData.createProduct.product });
    }
  }, [createData]);
  useEffect(() => {
    if (updateData) {
      setData({ ...updateData.updateStore.store });
    }
  }, [updateData]);

  useEffect(() => {
    if (!(createLoading || updateLoading)) {
      if (id && Object.keys(data).length === 0) {
        getStore({
          variables: { id }
        });
      }
    }
  }, []);

  //if (queryLoading || createLoading || updateLoading) return <p>Loading...</p>;
  //if (queryError || createError || updateError) return <p>Error :(</p>;

  return <DepoForm formDefaultValues={data} onSubmit={onSubmit} />;
}
