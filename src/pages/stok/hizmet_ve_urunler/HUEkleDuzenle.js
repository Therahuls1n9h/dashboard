import React from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import RoundIcon from "../../../components/RoundIcon";
import { CakeIcon, EditIcon, XIcon } from "../../../icons";
import PageTitle from "../../../components/Typography/PageTitle";
import { Input, Label, Button } from "@windmill/react-ui";
import { useMutation, useQuery } from "@apollo/client";

import { GET_PRODUCT, CREATE_PRODUCT } from "../../../queries/ProductQueries";

function HUEkleDuzenle() {
  // Get id parameter from URI
  let { id } = useParams();

  // Apollo Example
  const { q_loading, q_error, q_data } = useQuery(GET_PRODUCT, {
    variables: { id }
  });

  const [addProduct, { m_loading, m_error }] = useMutation(CREATE_PRODUCT);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const input = { input: { name: data.product_name, sku: data.product_sku } };
    addProduct({ variables: { ...input } });
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
                name="product_name"
                className="my-auto ml-3 text-xl font-medium text-gray-700"
                placeholder="Ürün Adı"
                ref={register}
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
              <Input name="product_sku" className="mt-1" ref={register} />
            </Label>
          </div>
        </form>
      </div>
    </>
  );
}

export default HUEkleDuzenle;
