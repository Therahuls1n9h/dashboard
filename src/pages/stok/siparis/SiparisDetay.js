import React from "react";
import { Link, useParams } from "react-router-dom";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Button
} from "@windmill/react-ui";

import RoundIcon from "../../../components/RoundIcon";
import { CakeIcon, EditIcon, TrashIcon, RewindIcon } from "../../../icons";
import PageTitle from "../../../components/Typography/PageTitle";
import { useQuery } from "@apollo/client";
import { GET_INBOUNDORDER_WITH_ITEM } from "../../../queries/OrderQueries";

import SiparisKalemiDetay from "./siparis_kalemi/SiparisKalemiDetay";

export default function SiparisDetay() {
  // Params from uri
  let { id } = useParams();

  // Get inbound order with order items
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData
  } = useQuery(GET_INBOUNDORDER_WITH_ITEM, {
    variables: { id }
  });

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error :(</p>;

  return (
    <>
      <PageTitle>Sipariş {">"} Detay</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col flex-wrap md:flex-row md:items-center md:justify-between">
          <div className="flex-1 inline-flex min-w-0">
            <RoundIcon
              icon={CakeIcon}
              iconColorClass="text-orange-500"
              bgColorClass="bg-orange-100"
            />
            <h2 className="my-auto mx-3 text-xl font-medium text-gray-700">
              {queryData.inboundOrder.date}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row">
            <Button
              block
              className="ml-0 md:ml-4 mt-4 md:mt-0"
              iconLeft={RewindIcon}
              tag={Link}
              to={`/app/siparis/`}
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
              to={`/app/siparis/${id}/duzenle`}
            >
              Düzenle
            </Button>
          </div>
        </div>
        <hr className="my-3" />
        <div className="my-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
          <div className="items-center text-sm text-gray-500 leading-5 mr-6">
            <b>Not :</b> {queryData.inboundOrder.note}
          </div>
        </div>
        <hr className="my-3" />
        <div className="my-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
          <div className="items-center text-sm text-gray-500 leading-5 mr-6">
            Toplam : 555 TL
          </div>
        </div>
      </div>

      <SiparisKalemiDetay inboundOrder={queryData.inboundOrder} />
    </>
  );
}
