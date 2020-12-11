import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { RefreshIcon } from "../icons";

export default function InfiniteScroll({ hasMore, loadMore, footerText }) {
  const { ref, inView } = useInView({
    threshold: 0,
    trackVisibility: true,
    delay: 100
  });

  useEffect(() => {
    console.log(inView);
    if (inView && typeof loadMore === "function") {
      loadMore();
    }
  }, [inView]);

  return (
    <>
      {hasMore && (
        <div ref={ref}>
          <RefreshIcon className="mx-auto w-5 h-5" />
        </div>
      )}
      <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
        <span className="flex items-center font-semibold tracking-wide uppercase"></span>
        <div className="flex mt-2 sm:mt-auto sm:justify-end">{footerText}</div>
      </div>
    </>
  );
}
