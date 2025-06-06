import React from "react";
import Certificate from "./Certificate";
import { useParams } from "react-router-dom";

const CertificateGenerator = () => {
  const { courseId } = useParams();

  return (
    <div className="container mx-auto p-6">
      <Certificate courseId={courseId} />
    </div>
  );
};

export default CertificateGenerator;
