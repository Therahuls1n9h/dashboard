import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_PRODUCT, UPDATE_PRODUCT } from "../../../queries/ProductQueries";

import RoundIcon from "../../../components/RoundIcon";
import { CakeIcon, EditIcon, XIcon } from "../../../icons";
import PageTitle from "../../../components/Typography/PageTitle";
import { Input, Label, Button } from "@windmill/react-ui";

export default function HUEkleDuzenleNew() {
  // Get product id from URI
  const { id } = useParams();

  // Get product from server
  const [getProduct, { queryLoading, queryError, queryData }] = useLazyQuery(
    GET_PRODUCT,
    {
      variables: { id }
    }
  );

  //
  const [
    updateProduct,
    { mutationLoading, mutationError, mutationData }
  ] = useMutation(UPDATE_PRODUCT);

  // Product form
  const [defaultValues, setDefaultValues] = useState({});
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);

    const input = { input: { name: formData.name, sku: formData.sku } };
    //addProduct({ variables: { ...input } });
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, []);

  useEffect(() => {
    if (!queryLoading && !queryError) {
      console.log(queryData);
      //setDefaultValues({ ...queryData.product });
    }
  }, [queryData]);

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
                name="name"
                className="my-auto ml-3 text-xl font-medium text-gray-700"
                placeholder="Ürün Adı"
                ref={register}
                defaultValue={defaultValues.name}
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
                onClick={handleSubmit(onSubmit)}
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
                name="sku"
                className="mt-1"
                ref={register}
                defaultValue={defaultValues.sku}
              />
            </Label>
          </div>
        </form>
      </div>
    </>
  );
}
