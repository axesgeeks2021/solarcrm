import React from "react";

function DocumentWarrantyListing({ document }) {
  return (
    <>
      <ol className="gradient-list flex flex-wrap justify-around items-start relative overflow-hidden document__warranty">
        <li>
          <span>Compliance</span>
          <span>{document.data?.install_docs?.compliance_status}</span>
          <a
            href={'https://solar365.co.in'+document.data?.install_docs?.compliance_docs}
            download
            style={{background: document.data?.install_docs?.compliance_status === "Uploaded" ? 'green' : '#eee',pointerEvents: document.data?.install_docs?.compliance_status === "Uploaded" ? 'auto' : 'none' }}
            target="_blank"
            
          >
            Download
          </a>
        </li>
        <li>
          <span>Contract</span>
          <span>{document.data?.install_docs?.contract_status}</span>
          <a
            href={'https://solar365.co.in' + document.data?.install_docs?.contract_docs}
            download
            style={{background: document.data?.install_docs?.contract_status === "Uploaded" ? 'green' : '#eee',pointerEvents: document.data?.install_docs?.contract_status === "Uploaded" ? 'auto' : 'none' }}
            target="_blank"
          >
            Download
          </a>
        </li>
        <li>
          <span>Energy Yield Report</span>
          <span>{document.data?.install_docs?.energy_yield_report_status}</span>
          <a
            href={'https://solar365.co.in' + document.data?.install_docs?.energy_yield_report_docs}
            download
            style={{background: document.data?.install_docs?.energy_yield_report_status === "Uploaded" ? 'green' : '#eee',pointerEvents: document.data?.install_docs?.energy_yield_report_status === "Uploaded" ? 'auto' : 'none' }}
            target="_blank"
          >
            Download
          </a>
        </li>
        <li>
          <span>Grid Approval</span>
          <span>{document.data?.install_docs?.grid_approval_status}</span>
          <a
            href={'https://solar365.co.in'+document.data?.install_docs?.grid_approval_docs}
            download
            style={{background: document.data?.install_docs?.grid_approval_status === "Uploaded" ? 'green' : '#eee',pointerEvents: document.data?.install_docs?.grid_approval_status === "Uploaded" ? 'auto' : 'none' }}
            target="_blank"
          >
            Download
          </a>
        </li>
        <li>
          <span>NOC</span>
          <span>{document.data?.install_docs?.noc_status}</span>
          <a
            href={'https://solar365.co.in'+document.data?.install_docs?.noc_docs}
            download
            style={{background: document.data?.install_docs?.noc_status === "Uploaded" ? 'green' : '#eee',pointerEvents: document.data?.install_docs?.noc_status === "Uploaded" ? 'auto' : 'none' }}
            target="_blank"
          >
            Download
          </a>
        </li>
        <li>
          <span>PV Site Info</span>
          <span>{document.data?.install_docs?.pv_site_info_status}</span>
          <a
            href={'https://solar365.co.in'+document.data?.install_docs?.pv_site_info_docs}
            download
            style={{background: document.data?.install_docs?.pv_site_info_status === "Uploaded" ? 'green' : '#eee',pointerEvents: document.data?.install_docs?.pv_site_info_status === "Uploaded" ? 'auto' : 'none' }}
            target="_blank"
          >
            Download
          </a>
        </li>
        <li>
          <span>Safety Certificate</span>
          <span>{document.data?.install_docs?.safety_certificate_status}</span>
          <a
            href={'https://solar365.co.in'+document.data?.install_docs?.safety_certificate_docs}
            download
            style={{background: document?.data?.install_docs?.safety_certificate_status === "Uploaded" ? 'green' : '#eee',pointerEvents: document.data?.install_docs?.safety_certificate_status === "Uploaded" ? 'auto' : 'none' }}
            target="_blank"
           
          >
            Download
          </a>
        </li>
      </ol>
    </>
  );
}

export default DocumentWarrantyListing;
