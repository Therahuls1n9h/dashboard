import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import RoundIcon from "../../../components/RoundIcon";
import { CakeIcon, EditIcon, XIcon } from "../../../icons";
import PageTitle from "../../../components/Typography/PageTitle";
import { Input, Label, Button } from "@windmill/react-ui";
import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_PRODUCT_QUERY = gql`
  mutation addProduct($product_name: String!, $product_sku: String) {
    addProduct(name: $product_name, stockCode: $product_sku) {
      id
      name
      stockCode
    }
  }
`;

const PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id) {
      id
      name
      sku
    }
  }
`;

function HUEkleDuzenle() {
  let { id } = useParams();

  // Apollo Example
  const { q_loading, q_error, q_data } = useQuery(PRODUCT, {
    variables: { id }
  });
  const [addProduct, { m_loading, m_error }] = useMutation(ADD_PRODUCT_QUERY);

  const { register, handleSubmit } = useForm();

  function handleAddProduct(event) {
    event.preventDefault();
    // the mutate function also doesn't return a promise
    //addProduct({ variables: { product_name, product_sku } });
  }

  const onSubmit = (data) => {
    console.log(data);
  };

  if (q_loading || m_loading) return <p>Loading...</p>;
  if (q_error || m_error) return <p>Error :(</p>;

  return (
    <>
      <PageTitle>
        Hizmet ve Ürünler {">"} {id ? "Düzenle" : "Ekle"}
      </PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col flex-wrap md:flex-row md:items-center md:justify-between">
            <div className="flex-1 inline-flex min-w-0">
              <RoundIcon
                icon={CakeIcon}
                iconColorClass="text-orange-500"
                bgColorClass="bg-orange-100"
              />
              <Input
                defaultValue={defaultValues.firstName}
                name="product_name"
                className="my-auto ml-3 text-xl font-medium text-gray-700"
                placeholder="Ürün Adı"
                onChange={(event) => setProductName(event.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row">
              <Button
                block
                layout="outline"
                className="ml-0 md:ml-4 mt-4 md:mt-0"
                iconLeft={XIcon}
                tag={Link}
                to="/app/hizmet_ve_urunler/ekle_duzenle"
              >
                Vazgeç
              </Button>
              <Button
                onClick={handleAddProduct}
                block
                className="ml-0 md:ml-4 mt-4 md:mt-0"
                iconLeft={EditIcon}
              >
                Kaydet
              </Button>
            </div>
          </div>
          <hr className="my-3" />
          <div className="my-1 flex flex-col">
            <Label>
              <span>SKU</span>
              <Input
                {...product_sku}
                name="product_sku"
                className="mt-1"
                onChange={(event) => setProductSKU(event.target.value)}
              />
            </Label>
          </div>
        </form>
      </div>
    </>
  );
}

export default HUEkleDuzenle;
