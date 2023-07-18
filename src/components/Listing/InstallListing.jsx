import React from "react";

function DocumentWarrantyListing({ document }) {
  return (
    <>
      <ol className="gradient-list flex flex-wrap justify-around items-start relative overflow-hidden document__warranty">
        <li>
          <span>Compliance</span>
          <span>{document.data?.install_docs?.compliance_status}</span>
          <a
            href={`http://3.111.192.129:8000/${document.data?.install_docs?.compliance_docs}`}
            download
            className={`${
              document.data?.install_docs?.compliance_status === "Received"
                ? "document__warranty li a download"
                : "document__warranty li a disabled"
            }`}
          >
            Download
          </a>
        </li>
        <li>
          <span>Contract</span>
          <span>{document.data?.install_docs?.contract_status}</span>
          <a
            href={`http://3.111.192.129:8000/${document.data?.install_docs?.contract_docs}`}
            download
            className={`${
              document.data?.install_docs?.contract_status === "Received"
                ? "document__warranty li a download"
                : "document__warranty li a disabled"
            }`}
          >
            Download
          </a>
        </li>
        <li>
          <span>Energy Yield Report</span>
          <span>{document.data?.install_docs?.energy_yield_report_status}</span>
          <a
            href={`http://3.111.192.129:8000/${document.data?.install_docs?.energy_yield_report_docs}`}
            download
            className={`${
              document.data?.install_docs?.energy_yield_report_status ===
              "Received"
                ? "document__warranty li a download"
                : "document__warranty li a disabled"
            }`}
          >
            Download
          </a>
        </li>
        <li>
          <span>Grid Approval</span>
          <span>{document.data?.install_docs?.grid_approval_status}</span>
          <a
            href={`http://3.111.192.129:8000/${document.data?.install_docs?.grid_approval_docs}`}
            download
            className={`${
              document.data?.install_docs?.grid_approval_status === "Received"
                ? "document__warranty li a download"
                : "document__warranty li a disabled"
            }`}
          >
            Download
          </a>
        </li>
        <li>
          <span>NOC</span>
          <span>{document.data?.install_docs?.noc_status}</span>
          <a
            href={`http://3.111.192.129:8000/${document.data?.install_docs?.noc_docs}`}
            download
            className={`${
              document.data?.install_docs?.noc_status === "Received"
                ? "document__warranty li a download"
                : "document__warranty li a disabled"
            }`}
          >
            Download
          </a>
        </li>
        <li>
          <span>PV Site Info</span>
          <span>{document.data?.install_docs?.pv_site_info_status}</span>
          <a
            href={`http://3.111.192.129:8000/${document.data?.install_docs?.pv_site_info_docs}`}
            download
            className={`${
              document.data?.install_docs?.pv_site_info_status === "Received"
                ? "document__warranty li a download"
                : "document__warranty li a disabled"
            }`}
          >
            Download
          </a>
        </li>
        <li>
          <span>Safety Certificate</span>
          <span>{document.data?.install_docs?.safety_certificate_status}</span>
          <a
            href={`http://3.111.192.129:8000/${document.data?.install_docs?.safety_certificate_docs}`}
            download
            className={`${
              document.data?.install_docs?.safety_certificate_status ===
              "Received"
                ? "document__warranty li a download"
                : "document__warranty li a disabled"
            }`}
          >
            Download
          </a>
        </li>
      </ol>
    </>
  );
}

export default DocumentWarrantyListing;
