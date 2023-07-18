import React, { useEffect, useState } from "react";
import PageHeading from "../../components/heading/PageHeading";
import Heading from "../../components/heading/Heading";
import OrderListing from "../../components/Listing/OrderListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchingOrders } from "../../features/OrderSlice";

import { useCookies } from "react-cookie";

function OrderDetails() {

  const [cookies] = useCookies();

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order);
  const { data, error, loading } = orders;

  useEffect(() => {
    dispatch(fetchingOrders(cookies.Authorization));
  }, []);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <section className="w-screen">
        <div className="w-full">
          <Heading
            heading="Order Details"
            size="1.9rem"
            weight="600"
            color="black"
          />
          <Heading
            heading="On this page you will find your system details"
            size="1rem"
            weight="600"
            color="black"
          />
        </div>
        <PageHeading heading1="Quotation" heading2="Complete" />
        <div className="listing">
          <OrderListing data={data} />
        </div>
      </section>
    </>
  );
}

export default OrderDetails;
