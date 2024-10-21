import React, { useEffect, useState } from "react";
import QrScanner from "../QrScanner";
import Modal from "react-modal";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../../../../index.css";
import zIndex from "@mui/material/styles/zIndex";
import Result from ".";
interface AssetTemplateProps {
  value: any;
  assetHash: string;
}

const AssetTemplate: React.FC<AssetTemplateProps> = ({ value, assetHash }) => {
  const size = value.length;
  const [verifierFlag, setVerifierFlag] = useState(Array(size).fill(false));
  const [notReqFlag, setNotReqFlag] = useState(Array(size).fill(false));
  const [scannedContent, setScannedContent] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  useEffect(() => {
    console.log("Updated notReqFlag: ", notReqFlag);
  }, [notReqFlag]);
  const handleScanClick = () => {
    console.log("assetValue ", value.length);
    setIsScannerOpen(true);
  };
  const handleScanClose = () => {
    setIsScannerOpen(false);
  };
  const handleScanResult = (result: string) => {
    setScannedContent(result);
  };
  const setNotReq = (index: number, newValue: boolean) => {
    setNotReqFlag((prevFlags) => [
      ...prevFlags.slice(0, index),
      newValue,
      ...prevFlags.slice(index + 1),
    ]);
    console.log("notReq ", index, "|", notReqFlag);
  };

  return (
    <div>
      <table className="assetTable">
        <thead>
          <tr>
            <th className="font-bold text-[11px] break-all">DVC Type</th>
            <th className="font-bold text-[11px] break-all">Scan</th>
            <th className="font-bold text-[11px] break-all">Description</th>
          </tr>
        </thead>
        <tbody>
          {value &&
            value.map((asset: any, index: number) => (
              <tr key={index}>
                <td className="font-normal text-[11px] break-all">
                  Asset {index + 1} <br />
                  {asset.assetType}
                </td>
                <td>
                  {verifierFlag[index] && <p>verified</p>} <br />
                  {!(
                    verifierFlag[index - 1] ||
                    notReqFlag[index - 1] ||
                    !(index === 0)
                  ) && (
                    <div>
                      <button
                        className="scanButton m-1"
                        disabled={
                          !(
                            index === 0 ||
                            verifierFlag[index - 1] ||
                            notReqFlag[index - 1]
                          )
                        }
                        onClick={() => handleScanClick()}
                      >
                        Scan this asset
                      </button>
                    </div>
                  )}
                  {(verifierFlag[index - 1] ||
                    (notReqFlag[index - 1] && index === 0)) && (
                    <div>
                      <button
                        className="scanButton"
                        disabled={
                          !(
                            index === 0 ||
                            verifierFlag[index - 1] ||
                            notReqFlag[index - 1]
                          )
                        }
                        onClick={() => {
                          console.log(
                            "Not Required button clicked for index: ",
                            index
                          );
                          setNotReq(index, true);
                        }}
                      >
                        Not Required
                      </button>{" "}
                    </div>
                  )}
                </td>
                {verifierFlag[index] && (
                  <td className="font-normal text-[11px] break-all">
                    {asset.assetData1} <br /> {asset.assetData2} <br />{" "}
                    {asset.assetData3}
                  </td>
                )}
                {/* <td className="font-normal text-[11px] break-all">
                  <img src={asset.qrUrl} alt="QR" />
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        isOpen={isScannerOpen}
        className="modal-content"
        overlayClassName="modal-overlay"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            border: "2px",
            zIndex: 1000,
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-30%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc", // add a border to the modal
            backgroundColor: "#fff", // white background
            padding: "20px",
            zIndex: 1001,
          },
        }}
      >
        <div className="scanContainer" style={{ position: "relative" }}>
          <IconButton
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              zIndex: 1005,
            }}
            onClick={() => setIsScannerOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <QrScanner
            onScanResult={(res: any) => {
              if (res) {
                console.log("Scanned Data: ", res);
                handleScanResult(res);
              }
            }}
          />
        </div>
      </Modal>
      {/* <Modal
        isOpen={isScannerOpen}
        onRequestClose={handleScanClose}
        contentLabel="QR Scanner"
        className="modal-content"
        overlayClassName="modal-overlay"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            border: "2px",
            zIndex: 1000,
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc", // add a border to the modal
            backgroundColor: "#fff", // white background
            padding: "20px",
            zIndex: 1001,
          },
        }}
      >
        <QrScanner />
      </Modal> */}
    </div>
  );
};
export default AssetTemplate;
