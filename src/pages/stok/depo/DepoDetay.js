import React from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@windmill/react-ui";

import RoundIcon from "../../../components/RoundIcon";
import { CakeIcon, EditIcon, RewindIcon } from "../../../icons";
import PageTitle from "../../../components/Typography/PageTitle";
import { useQuery } from "@apollo/client";
import { GET_STORE } from "../../../queries/StoreQueries";

export default function DepoDetay() {
  // Params from uri
  let { id } = useParams();

  // Apollo Example
  const { loading, error, data } = useQuery(GET_STORE, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <PageTitle>Depo {">"} Detay</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col flex-wrap md:flex-row md:items-center md:justify-between">
          <div className="flex-1 inline-flex min-w-0">
            <RoundIcon
              icon={CakeIcon}
              iconColorClass="text-orange-500"
              bgColorClass="bg-orange-100"
            />
            <h2 className="my-auto mx-3 text-xl font-medium text-gray-700">
              {data.store.name}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row">
            <Button
              block
              className="ml-0 md:ml-4 mt-4 md:mt-0"
              iconLeft={RewindIcon}
              tag={Link}
              to={`/app/depo/`}
            >
              Geri
            </Button>
          </div>
          <div className="flex flex-col md:flex-row">
            <Button
              block
              className="ml-0 md:ml-4 mt-4 md:mt-0"
              iconLeft={EditIcon}
              tag={Link}
              to={`/app/depo/${id}/duzenle`}
            >
              Düzenle
            </Button>
          </div>
        </div>
        <hr className="my-3" />
        <div className="my-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
          <div className="items-center text-sm text-gray-500 leading-5 mr-6">
            Toplam Stok : 43 Adet
          </div>
          <div className="items-center text-sm text-gray-500 leading-5 mr-6">
            Ortalama Alış Fiyatı : 18TL
          </div>
        </div>
      </div>
    </>
  );
}
