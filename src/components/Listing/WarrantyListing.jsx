import React from "react";

function WarrantyListing({ document }) {
  return (
    <ol className="gradient-list flex flex-wrap justify-around items-start relative overflow-hidden warranty">
      <li>
        <span>{document.data?.warranty?.battery_brands}</span>
        <a
          href={`https://solar365.co.in/${document.data?.install_docs?.battery_docs}`}
          download
        >
          Download
        </a>
      </li>
      <li>
        <span>{document.data?.warranty?.inverter_brands}</span>
        <a
          href={`https://solar365.co.in/${document.data?.warranty?.inverter_docs}`}
          download
        >
          Download
        </a>
      </li>
      <li>
        <span>{document.data?.warranty?.panels_brands}</span>
        <a
          href={`https://solar365.co.in/${document.data?.warranty?.panels_docs}`}
          download
        >
          Download
        </a>
      </li>
    </ol>
  );
}

export default WarrantyListing;
