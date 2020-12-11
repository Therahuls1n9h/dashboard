import React, { useContext, useEffect } from "react";
import { RefreshIcon } from "../../../icons";
import { ThemeContext } from "../../../context/ThemeContext";
import { useInView } from "react-intersection-observer";

export default function TableFooterLoader() {
  return (
    <>
      <span className="flex items-center font-semibold tracking-wide uppercase">
        <RefreshIcon className="w-5 h-5" />
      </span>

      <div className="flex mt-2 sm:mt-auto sm:justify-end">
        Toplam kayıt sayısı : XxX
      </div>
    </>
  );
}

interface InfiniteScrollProps {
  hasMore: boolean;

  /**
   * The total number of results
   */
  totalResults: number;
  /**
   * The number of results shown per page
   */
  resultsPerPage?: number;
  /**
   * The accessible name of the pagination (what does it refer to?)
   */
  label: string;
  /**
   * The function executed on page change
   */
  onChange: (activePage: number) => void;
}

type Ref = HTMLDivElement;

const InfiniteScroll = React.forwardRef<Ref, InfiniteScrollProps>(
  function InfiniteScroll(props, ref) {
    const {
      totalResults,
      resultsPerPage = 10,
      label,
      onChange,
      ...other
    } = props;

    const { ref: inViewRef, inView } = useInView({
      threshold: 0,
      trackVisibility: true,
      delay: 100
    });

    useEffect(() => {
      if (inView) {
      }
    }, [inView]);

    const {
      theme: { pagination }
    } = useContext(ThemeContext);

    const baseStyle = pagination.base;

    return (
      <div className={baseStyle} ref={ref} {...other}>
        <span className="flex items-center font-semibold tracking-wide uppercase">
          <RefreshIcon className="w-5 h-5" />
        </span>

        <div className="flex mt-2 sm:mt-auto sm:justify-end">
          Toplam kayıt sayısı : XxX
        </div>
      </div>
    );
  }
);

export default InfiniteScroll;
