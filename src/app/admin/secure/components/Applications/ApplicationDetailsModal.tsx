import {
  MailIcon,
  PhoneIcon,
  BriefcaseIcon,
  DollarSignIcon,
  FileTextIcon,
  CheckIcon,
} from "lucide-react";
import { JobApplication } from "@/app/admin/secure/services/jobApplicationService";
import { useState } from "react";

interface ApplicationDetailsModalProps {
  application: JobApplication;
  onUpdate: (id: number, data: {
    cover_letter: string;
    expected_salary: string;
    contact: string;
    name: string;
    experience: string;
    email: string
  }) => void;
}
export const ApplicationDetailsModal: React.FC<
  ApplicationDetailsModalProps
> = ({ application, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData] = useState({
    name: application.name,
    email: application.email,
    contact: application.contact || "",
    experience: application.experience || "",
    expected_salary: application.expected_salary?.toString() || "",
    cover_letter: application.cover_letter || "",
  });
  const handleSubmit = () => {
    onUpdate(application.id, formData);
    setIsUpdating(false);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-medium text-[#f1c233]">
            {application.name}
          </h3>
          <p className="text-sm text-gray-500">{application.email}</p>
        </div>
        <div className="text-right">
          {isUpdating ? (
            <button
              onClick={handleSubmit}
              className="flex items-center rounded-md bg-[#f1c233] px-2 py-1 text-sm text-white hover:bg-[#f1c233]/80"
            >
              <CheckIcon size={14} className="mr-1" />
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsUpdating(true)}
              className="text-sm text-[#f1c233] hover:text-[#f1c233]/80"
            >
              Edit Details
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">
              Contact Information
            </h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <MailIcon size={16} className="mr-2 text-gray-400" />
                <a
                  href={`mailto:${application.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {application.email}
                </a>
              </div>
              {application.contact && (
                <div className="flex items-center text-sm">
                  <PhoneIcon size={16} className="mr-2 text-gray-400" />
                  <a
                    href={`tel:${application.contact}`}
                    className="text-blue-600 hover:underline"
                  >
                    {application.contact}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">
              Professional Details
            </h4>
            <div className="space-y-2">
              {application.experience && (
                <div className="flex items-center text-sm">
                  <BriefcaseIcon size={16} className="mr-2 text-gray-400" />
                  <span>{application.experience} Experience</span>
                </div>
              )}
              {application.expected_salary && (
                <div className="flex items-center text-sm">
                  <DollarSignIcon size={16} className="mr-2 text-gray-400" />
                  <span>Expected: ${application.expected_salary}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {application.skills.map((skillObj) => (
                <span
                  key={skillObj.id}
                  className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700"
                >
                  {skillObj.skill}
                </span>
              ))}
            </div>
          </div>
          {application.cv_name && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500">
                Application Documents
              </h4>
              <div className="space-y-2">
                <a
                  href={`${application.cv_name}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-md bg-[#f1c233] px-3 py-2 text-sm text-white hover:bg-[#f1c233]/80"
                >
                  <FileTextIcon size={16} className="mr-2 text-white" />
                  View CV
                </a>
                {/* <a
                        href={`${filePath}`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center rounded-md bg-[#f1c233] px-3 py-2 text-sm text-white hover:bg-[#f1c233]/80"
                    >
                      <FileTextIcon size={16} className="mr-2 text-white"/>
                      download Document
                    </a>*/}
              </div>
            </div>
          )}
        </div>
      </div>
      {application.cover_letter && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
          <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-700">
            {application.cover_letter}
          </div>
        </div>
      )}
    </div>
  );
};
