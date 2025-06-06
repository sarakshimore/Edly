import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useGetCertificateQuery } from "@/features/api/certificateApi"; // API hook

const CertificateVerification = () => {
  const { certificateId } = useParams();
  const { data, isLoading, isError } = useGetCertificateQuery(certificateId);
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    if (data && data.success) {
      setCertificate(data.certificate);
    }
  }, [data]);

  if (isLoading) return <p>Verifying certificate...</p>;
  if (isError || !certificate) return <p>❌ Invalid or non-existent certificate.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem", textAlign: "center" }}>
      <h1>✅ Certificate Verified</h1>
      <p>This certificate is valid and issued by <strong>{certificate.issuerName}</strong>.</p>
      <h2>{certificate.userName}</h2>
      <p>Successfully completed:</p>
      <h3>{certificate.courseTitle}</h3>
      <p>Date: {certificate.date}</p>
      <p>Certificate ID: {certificateId}</p>
      <div style={{ marginTop: "20px" }}>
        <QRCode value={window.location.href} size={100} />
      </div>
    </div>
  );
};

export default CertificateVerification;
