import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  convertToId,
  convertToTitleCase,
  getDisplayValue,
} from "../../../../utils/misc";
import StyledButton from "../commons/StyledButton";
import CropTemplate from "./CropTemplate";
import LandTemplate from "./LandTemplate";
import { ReactComponent as DocumentIcon } from "../../../../assets/document.svg";
import { useAppDispatch } from "../../../../redux/hooks";
import { goHomeScreen } from "../../../../redux/features/verification/verification.slice";
import AssetTemplate from "./AssetTemplate";
const propertyOrder = [
  "farmerId",
  "farmerName",
  "identifierName",
  "gender",
  "dob",
  "address",
  "assetCredentials",
  "landDetails",
  "farmId",
  "surveyNumber",
  "village",
  "district",
  "cropDetails",
  "season",
  "year",
  "cropName",
  "sownArea",
  "issuanceDate",
  "disclaimer",
];

interface VcDisplayCardProps {
  vc: any;
}
// function VcDisplayCard({ vc }: { vc: any }) {
const VcDisplayCard: React.FC<VcDisplayCardProps> = ({ vc }) => {
  useEffect(() => {
    const storeCredential = async () => {
      if (!vc) return;
      try {
        const response = await fetch("http://localhost:3000/store-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vc),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Data stored successfully:", data);
      } catch (error) {
        console.error("Failed to store data:", error);
      }
    };

    // Call the function to store the credential
    storeCredential();
  }, [vc]);

  const dispatch = useAppDispatch();
  return (
    <div>
      <div
        className={`grid w-[700px] m-auto bg-white rounded-[12px] py-[5px] px-[15px] shadow-lg`}
      >
        {vc ? (
          propertyOrder
            .filter(
              (key) =>
                vc.credentialSubject.hasOwnProperty(key) &&
                key?.toLowerCase() !== "id" &&
                key?.toLowerCase() !== "type"
            )
            // Object.keys(vc.credentialSubject)
            //   .filter(
            //     (key) =>
            //       key?.toLowerCase() !== "id" && key?.toLowerCase() !== "type"
            //   )
            .map((key, index) => (
              <div className={`py-2.5 px-1 xs:col-end-13`} key={key}>
                <p
                  id={convertToId(key)}
                  className="font-bold text-[11px] break-all"
                >
                  {convertToTitleCase(key)}
                </p>
                {typeof vc.credentialSubject[key] === "string" ? (
                  <p
                    id={`${convertToId(key)}-value`}
                    className="font-normal text-[12px] break-all"
                  >
                    {getDisplayValue(vc.credentialSubject[key])}
                  </p>
                ) : key === "landDetails" ? (
                  <LandTemplate value={vc.credentialSubject[key]} />
                ) : key === "cropDetails" ? (
                  <CropTemplate value={vc.credentialSubject[key]} />
                ) : key === "assetCredentials" ? (
                  <AssetTemplate
                    value={vc.credentialSubject[key]}
                    assetHash={vc.credentialSubject.assetHash}
                  />
                ) : (
                  <p
                    id={`${convertToId(key)}-value`}
                    className="font-bold text-[12px] break-all"
                  >
                    {JSON.stringify(vc.credentialSubject[key], null, 2)}
                  </p>
                )}
              </div>
            ))
        ) : (
          <div className="grid content-center justify-center w-[100%] h-[320px] text-[#000000] opacity-10">
            <DocumentIcon />
          </div>
        )}
      </div>
      <div className="grid content-center justify-center">
        <StyledButton
          id="verify-another-qr-code-button"
          className="mx-auto mt-6 mb-20 lg:mb-6"
          onClick={() => {
            dispatch(goHomeScreen({}));
          }}
        >
          Verify Another QR code
        </StyledButton>
      </div>
    </div>
  );
};

export default VcDisplayCard;
