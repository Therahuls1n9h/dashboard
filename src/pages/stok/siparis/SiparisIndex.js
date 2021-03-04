import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_INBOUNDORDERS,
  DELETE_INBOUNDORDER
} from "../../../queries/OrderQueries";

import PageTitle from "../../../components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TableFooter,
  Button,
  Label
} from "@windmill/react-ui";
import { CakeIcon, EditIcon, TrashIcon } from "../../../icons";

import RoundIcon from "../../../components/RoundIcon";
import InfiniteScroll from "../../../components/InfiniteScroll";
import ConfirmModal from "../../../components/ConfirmModal";

function SiparisIndex() {
  // Register form
  const { register, handleSubmit, getValues } = useForm();

  // Get inbound orders
  const [
    getInboundOrders,
    {
      loading: queryLoading,
      error: queryError,
      data: queryData,
      fetchMore: queryFetchMore
    }
  ] = useLazyQuery(GET_INBOUNDORDERS);

  // Delete inbound order
  const [
    deleteInboundOrder,
    { loading: deleteLoading, error: deleteError, data: deleteData }
  ] = useMutation(DELETE_INBOUNDORDER, {
    onCompleted() {
      onFilter({ filter: getValues("filter") });
    }
  });

  const onLoadMore = () => {
    if (
      queryData &&
      !queryLoading &&
      queryData.inboundOrders.pageInfo.hasNextPage
    ) {
      queryFetchMore({
        variables: {
          after: queryData.inboundOrders.pageInfo.endCursor,
          first: 5
        }
      });
    }
  };

  const onFilter = (formData) => {
    if (queryData && !queryLoading) {
      if (formData?.filter) {
        getInboundOrders({ variables: { filter: formData.filter } });
      } else {
        getInboundOrders();
      }
    }
  };

  const [modalProps, setModalProps] = useState({
    isOpen: false,
    title: "",
    message: "Silmek istediğinize emin misiniz ?"
  });

  const onDelete = (inboundOrderId) => {
    setModalProps((prev) => ({
      ...prev,
      isOpen: true,
      onOk: () => {
        deleteInboundOrder({
          variables: { input: { id: inboundOrderId } }
        });

        setModalProps((prev) => ({
          ...prev,
          isOpen: false
        }));
      },
      onCancel: () => {
        setModalProps((prev) => ({
          ...prev,
          isOpen: false
        }));
      }
    }));
  };

  useEffect(() => {
    getInboundOrders();
  }, []);

  //if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error :(</p>;

  return (
    <>
      <ConfirmModal {...modalProps} />
      <PageTitle>Siparişler</PageTitle>

      <div className="mb-4 flex flex-col flex-wrap md:flex-row md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <form onSubmit={handleSubmit(onFilter)}>
            <Label>
              <div className="relative">
                <input
                  name="filter"
                  ref={register}
                  className="block w-full pl-20 mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                />
                <button
                  className="absolute inset-y-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-l-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  onClick={handleSubmit(onFilter)}
                >
                  Filtrele
                </button>
              </div>
            </Label>
          </form>
        </div>
        <div className="flex flex-col md:flex-row">
          <Button
            className="ml-0 md:ml-4 mt-4 md:mt-0"
            tag={Link}
            to="/app/siparis/ekle"
          >
            Sipariş Ekle
          </Button>
        </div>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Sipariş Tarihi</TableCell>
              <TableCell>Not</TableCell>
              <TableCell>Düzenle/Sil</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {queryData?.inboundOrders?.edges?.map(({ cursor, node }) => (
              <TableRow key={node.id}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <RoundIcon
                      icon={CakeIcon}
                      iconColorClass="text-orange-500"
                      bgColorClass="bg-orange-100"
                    />
                    <div>
                      <Link
                        className="ml-3 font-semibold"
                        to={`/app/siparis/${node.id}/detay`}
                      >
                        {node.date}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{node.note}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      tag={Link}
                      to={`/app/siparis/${node.id}/duzenle`}
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                    >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      onClick={() => {
                        onDelete(node.id);
                      }}
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <InfiniteScroll
            loadMore={onLoadMore}
            hasMore={queryData?.products?.pageInfo?.hasNextPage}
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default SiparisIndex;
