import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCT, UPDATE_PRODUCT } from "../../../queries/ProductQueries";
import HUEkleDuzenleForm from "./HUEkleDuzenleForm";

// https://stackoverflow.com/a/61322784
// https://www.digitalocean.com/community/tutorials/how-to-call-web-apis-with-the-useeffect-hook-in-react
export default function HUDuzenle() {
  // Get id parameter from URI
  let { id } = useParams();

  console.log("ID from URI : " + id);

  // Get product from server
  const { queryLoading, queryError, data } = useQuery(GET_PRODUCT, {
    variables: { id }
  });

  const [
    updateProduct,
    { mutationLoading, mutationError, mutationData }
  ] = useMutation(UPDATE_PRODUCT);

  // TODO: On update function send only dirty fields to api server
  const onSubmit = (formData) => {
    const updateInput = {
      input: { id: id, name: formData.name, sku: formData.sku }
    };

    updateProduct({ variables: { ...updateInput } });
  };

  if (queryLoading || mutationLoading) return <p>Loading...</p>;
  if (queryError || mutationError) return <p>Error :(</p>;

  console.log(data);

  return (
    <HUEkleDuzenleForm formDefaultValues={data.product} onSubmit={onSubmit} />
  );
}
