import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import RoundIcon from "../../../components/RoundIcon";
import { CakeIcon, EditIcon, XIcon } from "../../../icons";
import PageTitle from "../../../components/Typography/PageTitle";
import { Input, Label, Button } from "@windmill/react-ui";

export default function HUEkleDuzenleForm({ formDefaultValues, onSubmit }) {
  const { register, handleSubmit } = useForm({
    defaultValues: formDefaultValues
  });

  return (
    <>
      <PageTitle>
        Hizmet ve Ürünler {">"} {formDefaultValues.id ? "Düzenle" : "Ekle"}
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
              <Input name="sku" className="mt-1" ref={register} />
            </Label>
          </div>
        </form>
      </div>
    </>
  );
}
