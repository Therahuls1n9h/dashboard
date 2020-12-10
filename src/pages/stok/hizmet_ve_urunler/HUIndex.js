import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useInView } from "react-intersection-observer";

import PageTitle from "../../../components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Button,
  Label
} from "@windmill/react-ui";
import { CakeIcon, EditIcon, TrashIcon } from "../../../icons";

import RoundIcon from "../../../components/RoundIcon";

const PRODUCTS = gql`
  query GET_PRODUCTS {
    products {
      edges {
        cursor
        node {
          id
          name
          sku
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

function HUIndex() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0
  });

  useEffect(() => {
    console.log("InView : " + inView);
  }, [inView]);

  // Apollo Example
  const { loading, error, data } = useQuery(PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <PageTitle>Hizmet ve Ürünler</PageTitle>

      <div className="mb-4 flex flex-col flex-wrap md:flex-row md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <Label>
            <div className="relative">
              <input className="block w-full pl-20 mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" />
              <button className="absolute inset-y-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-l-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Filtrele
              </button>
            </div>
          </Label>
        </div>
        <div className="flex flex-col md:flex-row">
          <Button
            className="ml-0 md:ml-4 mt-4 md:mt-0"
            tag={Link}
            to="/app/hizmet_ve_urunler/ekle"
          >
            Hizmet / Ürün Ekle
          </Button>
        </div>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Hizmet/Ürün</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Düzenle/Sil</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.products.edges.map(({ cursor, node }) => (
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
                        to={`/app/hizmet_ve_urunler/${node.id}/detay`}
                      >
                        {node.name}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{node.sku}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="loading" ref={ref}>
        <h2>Load More !</h2>
      </div>
    </>
  );
}

export default HUIndex;
