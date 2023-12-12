import React, { useEffect } from "react";

import PageHeading from "../../components/heading/PageHeading";
import Heading from "../../components/heading/Heading";

import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { fetchDocumentWarranty } from "../../features/DocumentsWarrantySlice";
import InstallListing from "../../components/Listing/InstallListing";
import WarrantyListing from "../../components/Listing/WarrantyListing";

function DocumentWarranty() {
  const dispatch = useDispatch();

  const document = useSelector((state) => state.documentWarranty);

  const [cookies] = useCookies();

  console.log('docuemnts', document)

  useEffect(() => {
    dispatch(fetchDocumentWarranty(cookies.Authorization));
  }, []);
  return (
    <>
      <section className="w-screen">
        <div className="w-full">
          <Heading
            heading="Documents & Warranty"
            size="1.9rem"
            weight="600"
            color="black"
          />
          <Heading
            heading="On this page you will find important documents concerning needed your solar PV system, you can read review and download each documents."
            size="0.9rem"
            weight="600"
            color="black"
          />
        </div>
        <PageHeading heading1="Documents & Warranty" heading2="Download" />
        <div className="listing">
          <Heading
            heading="List of Install Documents"
            size="1.4rem"
            weight="600"
            align="justify"
          />

          <InstallListing document={document} />
        </div>
        {/*<div className="listing">
          <Heading
            heading="List of Warranty Documents"
            size="1.4rem"
            weight="600"
            align="justify"
          />
          <WarrantyListing document={document} />
  </div>*/}
      </section>
    </>
  );
}

export default DocumentWarranty;
