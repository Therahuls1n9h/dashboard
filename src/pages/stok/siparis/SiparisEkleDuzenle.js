import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_INBOUNDORDER,
  UPDATE_INBOUNDORDER,
  CREATE_INBOUNDORDER
} from "../../../queries/OrderQueries";
import SiparisForm from "./SiparisForm";

export default function SiparisEkleDuzenle() {
  // Get id parameter from URI
  const { id } = useParams();

  const history = useHistory();

  // Get inbound order from server
  const [
    getInboundOrder,
    { loading: queryLoading, error: queryError, data: queryData }
  ] = useLazyQuery(GET_INBOUNDORDER);

  // Update inbound order
  const [
    updateInboundOrder,
    { loading: updateLoading, error: updateError, data: updateData }
  ] = useMutation(UPDATE_INBOUNDORDER);

  // Create new inbound order
  const [
    createInboundOrder,
    { loading: createLoading, error: createError, data: createData }
  ] = useMutation(CREATE_INBOUNDORDER);

  // TODO: On update function send only dirty fields to api server
  const onSubmit = (formData) => {
    if (id) {
      updateInboundOrder({ variables: { input: { id: id, ...formData } } });
    } else {
      createInboundOrder({ variables: { input: { ...formData } } });
    }
  };

  const [data, setData] = useState({});
  useEffect(() => {
    if (queryData) {
      setData({ ...queryData.inboundOrder });
    }
  }, [queryData]);
  // Redirect to edit page. Search ApolloClient API, there should be better prop for this
  useEffect(() => {
    if (createData) {
      history.push(
        `/app/siparis/${createData.createInboundOrder.inboundOrder.id}/duzenle`
      );
      //setData({ ...createData.createProduct.product });
    }
  }, [createData]);
  useEffect(() => {
    if (updateData) {
      setData({ ...updateData.updateInboundOrder.inboundOrder });
    }
  }, [updateData]);

  useEffect(() => {
    if (!(createLoading || updateLoading)) {
      if (id && Object.keys(data).length === 0) {
        getInboundOrder({
          variables: { id }
        });
      }
    }
  }, []);

  //if (queryLoading || createLoading || updateLoading) return <p>Loading...</p>;
  //if (queryError || createError || updateError) return <p>Error :(</p>;

  return <SiparisForm formDefaultValues={data} onSubmit={onSubmit} />;
}
