import api from "./api";
import {
  CreateJobApplicationDTO,
  JobApplication,
} from "../../types/jobApplication";
export const jobApplicationService = {
  createJobApplication: async (
    application: CreateJobApplicationDTO
  ): Promise<JobApplication> => {
    try {
      const formData = new FormData();
      // Add basic fields
      formData.append("name", application.name);
      formData.append("email", application.email);
      formData.append(
        "jobOpportunityId",
        application.jobOpportunityId.toString()
      );
      // Add optional fields
      if (application.contact) {
        formData.append("contact", application.contact);
      }
      if (application.experience) {
        formData.append("experience", application.experience);
      }
      if (application.expected_salary) {
        formData.append(
          "expected_salary",
          application.expected_salary.toString()
        );
      }
      // Ensure skills is an array and properly stringified
      const skillsArray = ["Construction", "Teamwork"];
      formData.append("skills", JSON.stringify(skillsArray));
      // Add files if they exist
      if (application.cv) {
        formData.append("cv", application.cv);
      }
      if (application.cover_letter) {
        formData.append("cover_letter", application.cover_letter);
      }
      const response = await api.post<JobApplication>(
        "/jobApplications",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating job application:", error);
      throw error;
    }
  },
};
