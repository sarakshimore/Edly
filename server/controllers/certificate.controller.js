import { Certificate } from "../models/certificate.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

// Controller to generate a certificate
export const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id; // ✅ Now using req.id instead of req.user._id

    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({ courseId, userId });

    if (existingCertificate) {
      return res.status(200).json({
        success: true,
        message: "Certificate already exists.",
        certificate: existingCertificate,
      });
    }

    const course = await Course.findById(courseId).populate("creator", "name");
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Course or User",
      });
    }

    // Generate new CertificateId
    const certificateId = `CID-${Math.floor(100000 + Math.random() * 900000)}`;

    const newCertificate = await Certificate.create({
      certificateId,
      userId,
      userName: user.name,
      courseId,
      courseTitle: course.courseTitle,
      issuedDate: new Date(),
      instructorName: course.creator.name,
    });

    res.status(201).json({
      success: true,
      message: "Certificate generated successfully.",
      certificate: newCertificate,
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Controller to fetch existing certificate
export const getCertificateByUserAndCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id; // ✅ Now using req.id instead of req.user._id

    const certificate = await Certificate.findOne({ courseId, userId });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }

    res.status(200).json({
      success: true,
      certificate,
    });
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
