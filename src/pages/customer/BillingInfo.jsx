import React, { useEffect, useState } from "react";

import Heading from "../../components/heading/Heading";
import PageHeading from "../../components/heading/PageHeading";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoice } from "../../features/BillingInfoSlice";
import { useCookies } from "react-cookie";
import axios from "axios";

function BillingInfo() {
  const [cookies] = useCookies();

  const [history, setHistory] = useState([]);

  const dispatch = useDispatch();

  const invoice = useSelector((state) => state.invoice);

  const fetchInvoiceHistory = () => {
    try {
      const res = axios
        .get("http://3.111.192.129:8000/invoice_hist", {
          headers: {
            Authorization: `Token ${cookies.Authorization}`,
          },
        })
        .then((res) => {
          setHistory(res.data.invoice);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchInvoice(cookies.Authorization));
    fetchInvoiceHistory();
  }, []);

  return (
    <>
      <section className="documents__container w-screen">
        <div className=" headings w-full">
          <Heading heading="Billing" size="1.9rem" weight="600" color="black" />
          <Heading
            heading="We need you to supply some documentation to ensure small-scale technology certificate(STC) eligibility and grid connection permits done correctly."
            size="1rem"
            weight="600"
            color="black"
          />
        </div>
        <PageHeading heading1="Billing Info" heading2="Download" />
        <div className="grid__connection__cards flex justify-evenly items-center gap-10">
          <div className="grid__connection__card">
            <div className="grid__connection__details">
              <p>{invoice.data.invoice?.invoice_number}</p>
              <p>Invoice Number</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details">
              <p>$ {invoice.data.invoice?.total_amount}</p>
              <p>Total System Price</p>
            </div>
          </div>

          <div className="grid__connection__card">
            <div className="grid__connection__details">
              <p>$ {invoice.data.invoice?.amount_due}</p>
              <p>Total Amount Due</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details">
              <p>Summary</p>
              <p>View Summary</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details">
              <p>Invoice</p>
              <p>View Invoice</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details">
              <p>Pay Now</p>
              <p>Click Here</p>
            </div>
          </div>
        </div>
        <div className="block"></div>
        <div className="important__notice table">
          <Heading
            heading="Payment History"
            size="1.6rem"
            weight="600"
            align="justify"
          />
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Amount Paid</th>
                <th>Amount Due</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {history &&
                history.map((ele, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{ele.payment_date}</td>
                      <td>{ele.payment_method}</td>
                      <td>$ {Math.round(ele.amount_paid)}</td>
                      <td>$ {Math.round(ele.amount_due)}</td>
                      <td>Download</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default BillingInfo;
