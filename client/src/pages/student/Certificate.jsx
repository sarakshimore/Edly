import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetCertificateQuery,
  useGenerateCertificateMutation,
} from "@/features/api/certificateApi";

const Certificate = () => {
  const { courseId } = useParams();
  const { user } = useSelector((store) => store.auth);

  const { data, isLoading, isError, refetch, error } = useGetCertificateQuery(courseId);
  const [generateCertificate] = useGenerateCertificateMutation();
  const [certificate, setCertificate] = useState(null);

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (data?.certificate) {
      setCertificate(data.certificate);
    } else if (isError && error?.status === 404) {
      // If certificate not found, generate it
      handleGenerateCertificate();
    }
  }, [data, isError, error]);

  const handleGenerateCertificate = async () => {
    try {
      const { data } = await generateCertificate(courseId);
      setCertificate(data.certificate);
      refetch(); // refetch after generating
    } catch (err) {
      console.error("Failed to generate certificate", err);
    }
  };

  const downloadCertificate = (type = "png") => {
    const certificateElement = document.getElementById("certificate-preview");

    html2canvas(certificateElement).then((canvas) => {
      if (type === "png") {
        const link = document.createElement("a");
        link.download = `certificate-${certificate?.certificateId}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } else {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`certificate-${certificate?.certificateId}.pdf`);
      }
    });
  };

  if (isLoading || !certificate) return <p>Loading certificate...</p>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Directly display the certificate once fetched */}
      <div
        id="certificate-preview"
        style={{
          background: "#fff",
          border: "15px solid #2c3e50",
          padding: "4rem",
          margin: "2rem auto",
          width: "1000px",
          height: "700px",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          position: "relative",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Certificate of Excellence
        </h2>
        <p style={{ fontSize: "1.2rem" }}>This is to certify that</p>
        <h3 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          {user?.name}
        </h3>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          has successfully completed the
        </p>
        <h4 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {certificate.courseTitle}
        </h4>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          Date of Completion: {new Date(certificate.issuedDate).toISOString().split("T")[0]}
        </p>
        <p style={{ fontSize: "1rem", fontStyle: "italic", marginTop: "1rem" }}>
          Certificate ID: {certificate.certificateId}
        </p>
        <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
          Issued By: {certificate.instructorName}
        </p>
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            background: "white",
            padding: "0.5rem",
          }}
        >
          <QRCode
            value={`${window.location.origin}/verify/${certificate.certificateId}`}
            size={80}
          />
        </div>
      </div>

      {/* Display download options */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          margin: "2rem 0",
        }}
      >
        <button onClick={() => downloadCertificate("png")}>Download PNG</button>
        <button onClick={() => downloadCertificate("pdf")}>Download PDF</button>
      </div>
    </div>
  );
};

export default Certificate;
