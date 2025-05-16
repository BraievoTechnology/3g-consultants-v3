"use client";
import React, { useState, Fragment, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  UserIcon,
  FileTextIcon,
  SendIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";
import Button from "@/app/Components/ui/Button";
import { jobService } from "../../services/api/jobService";
import { CreateJobApplicationDTO } from "../../types/jobApplication";
import { jobApplicationService } from "../../services/api/jobApplicationService";
import { Job } from "@/app/types/job";
import Footer from "@/app/Components/Layout/Footer";
import Header from "@/app/Components/Layout/Header";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  skills: string[];
  whyJoin: string;
  relevantExperience: string;
  expectedSalary: string;
  cv: File | null;
  coverLetter: File | null;
}
const JobApplicationPage = () => {
  const router = useRouter();
  const params = useParams();
  // @ts-ignore
  const [job, setJob] = useState<never>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    education: "",
    skills: [
      "Project Management",
      "Team Leadership",
      "Risk Management",
      "PMP Certified",
    ],
    whyJoin: "",
    relevantExperience: "",
    expectedSalary: "",
    cv: null,
    coverLetter: null,
  });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      const jobOpenings = await jobService.getAllJobs();
      const foundJob = jobOpenings.find(
        (job: Job) => job.id === Number(params.id)
      );
      setJob(foundJob);
    };

    fetchJob();
  }, [params.id]);

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Job Not Found</h1>
        <p className="mb-8">
          The job posting you&#39;re looking for doesn&#39;t exist or has been
          removed.
        </p>
        <Button to="/careerspage" variant="secondary">
          View All Jobs
        </Button>
      </div>
    );
  }

  const steps = [
    {
      number: 1,
      title: "Personal Details",
      icon: <UserIcon className="w-5 h-5" />,
    },
    {
      number: 2,
      title: "Application Questions",
      icon: <FileTextIcon className="w-5 h-5" />,
    },
    {
      number: 3,
      title: "Upload Documents",
      icon: <SendIcon className="w-5 h-5" />,
    },
  ];
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const applicationData: CreateJobApplicationDTO = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
        experience: formData.relevantExperience,
        expected_salary: parseFloat(formData.expectedSalary) || undefined,
        skills: Array.isArray(formData.skills) ? formData.skills : [],
        jobOpportunityId: Number(params.id),
        cv: formData.cv,
        cover_letter: formData.coverLetter,
      };
      await jobApplicationService.createJobApplication(applicationData);
      // Show success message and redirect
      router.push("/careerspage");
    } catch (error) {
      console.error("Error submitting application:", error);
      // Handle error - show error message to user
    }
  };
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };
  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg text-gray-600 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            {/* Contact Information Section */}
            <div>
              <h3 className="text-lg text-gray-600 mb-4">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            {/* Education & Skills Section */}
            <div>
              <h3 className="text-lg text-gray-600 mb-4">Education & Skills</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Education <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="Master's in Construction Management"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder="Type a skill and press Enter"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  />
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 group hover:bg-blue-200 transition-colors"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Press Enter to add a new skill
                  </p>
                </div>
              </div>
            </div>
            {/* Professional Details Section */}
            <div>
              <h3 className="text-lg text-gray-600 mb-4">
                Professional Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Expected Salary <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Why do you want to join our team? *
              </label>
              <textarea
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Describe your relevant experience *
              </label>
              <textarea
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Upload your CV/Resume *
              </label>
              <input
                type="file"
                name="cv"
                onChange={handleFileChange}
                accept="application/pdf"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Accepted formats: PDF(Max 5MB)
              </p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Upload Cover Letter (Optional)
              </label>
              <input
                type="file"
                name="coverLetter"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Header />
      <div className="w-full">
        <div className="bg-[#f1c235] py-12">
          <div className="container mx-auto px-4">
            <button
              onClick={() => router.push("/careerspage")}
              className="text-white flex items-center hover:underline"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Job Listing
            </button>
            <h1 className="text-3xl font-bold text-white mt-4">
              Job Application
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Stepper */}
            <div className="mb-12">
              <div className="flex items-center justify-center">
                {steps.map((step, index) => (
                  <Fragment key={step.number}>
                    <div className="flex flex-col items-center relative">
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 ${
                          currentStep > step.number
                            ? "bg-green-500 text-white"
                            : currentStep === step.number
                            ? "bg-black text-[#f1c235]"
                            : "bg-gray-200 text-gray-500"
                        }`}
                        initial={{
                          scale: 0.8,
                        }}
                        animate={{
                          scale: currentStep === step.number ? 1 : 0.8,
                        }}
                      >
                        {currentStep > step.number ? (
                          <CheckCircleIcon className="w-6 h-6" />
                        ) : (
                          step.icon
                        )}
                      </motion.div>
                      <div
                        className={`text-sm font-medium mt-2 absolute -bottom-6 w-max ${
                          currentStep >= step.number
                            ? "text-blue-900"
                            : "text-gray-500"
                        }`}
                        style={{
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-[2px] mx-4 relative">
                        <div className="absolute inset-0 bg-gray-200" />
                        <motion.div
                          className="absolute inset-0 bg-blue-900"
                          initial={{
                            scaleX: 0,
                          }}
                          animate={{
                            scaleX: currentStep > step.number ? 1 : 0,
                          }}
                          style={{
                            originX: 0,
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                        />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                {renderStepContent()}
              </div>
              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex items-center"
                  >
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleNext}
                      className="flex items-center"
                    >
                      Next
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="primary">
                      Submit Application
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default JobApplicationPage;
