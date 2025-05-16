"use client";
import { useEffect, useState } from "react";

import {
  JobApplication,
  jobApplicationService,
  JobApplicationSkill,
} from "@/app/admin/secure/services/jobApplicationService";
import { UserIcon } from "lucide-react";

import { DataTable } from "@/app/admin/secure/components/UI/DataTable";
import { Modal } from "@/app/admin/secure/components/UI/Modal";
import { ApplicationDetailsModal } from "@/app/admin/secure/components/Applications/ApplicationDetailsModal";
import { PageTransition } from "../../components/UI/PageTransition";

const JobApplications: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    JobApplication[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setIsLoading] = useState(true);
  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const data = await jobApplicationService.getAllApplications();
      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchApplications();
  }, []);
  useEffect(() => {
    if (!searchTerm) {
      setFilteredApplications(applications);
      return;
    }
    const filtered = applications.filter((app) => {
      const searchString = searchTerm.toLowerCase();
      return (
        (app.name?.toLowerCase() || "").includes(searchString) ||
        (app.email?.toLowerCase() || "").includes(searchTerm) ||
        (app.experience?.toLowerCase() || "").includes(searchTerm) ||
        (app.contact?.toLowerCase() || "").includes(searchTerm)
      );
    });
    setFilteredApplications(filtered);
  }, [searchTerm, applications]);
  const handleUpdateApplication = async (
    id: number,
    data: Partial<JobApplication>
  ) => {
    try {
      await jobApplicationService.updateApplication(id, data);
      await fetchApplications();
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  };
  const columns = [
    {
      key: "name",
      header: "Candidate",
      width: "30%",
      render: (value: string, row: JobApplication) => (
        <div>
          <div className="font-medium text-gray-900 flex items-center">
            <UserIcon size={16} className="mr-2 text-gray-400" />
            {value}
          </div>
          <div className="text-sm text-gray-500 mt-1">{row.email}</div>
        </div>
      ),
    },
    {
      key: "experience",
      header: "Experience",
      width: "20%",
      render: (value: string | null) => (
        <div className="text-sm text-gray-600">{value || "Not specified"}</div>
      ),
    },
    {
      key: "expected_salary",
      header: "Expected Salary",
      width: "20%",
      render: (value: number | null) => (
        <div className="text-sm text-gray-600">
          {value ? `$${value}` : "Not specified"}
        </div>
      ),
    },
  ];

  return (
    <PageTransition>
      <div className="px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-medium">Job Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all job applications
          </p>
        </div>
        <DataTable
          columns={columns}
          data={filteredApplications}
          searchPlaceholder="Search applications..."
          filterOptions={{
            label: "Filter by status",
            options: [
              {
                label: "New",
                value: "New",
              },
              {
                label: "Under Review",
                value: "Under Review",
              },
              {
                label: "Shortlisted",
                value: "Shortlisted",
              },
              {
                label: "Interviewed",
                value: "Interviewed",
              },
              {
                label: "Rejected",
                value: "Rejected",
              },
            ],
          }}
          onSearch={setSearchTerm}
          onRowClick={(row) => {
            setSelectedApplication(row);
            setIsModalOpen(true);
          }}
        />
        {selectedApplication && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedApplication(null);
            }}
            title="Application Details"
          >
            <ApplicationDetailsModal
              application={selectedApplication}
              onUpdate={handleUpdateApplication}
            />
          </Modal>
        )}
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredApplications.length} of {applications.length}{" "}
          applications
        </div>
      </div>
    </PageTransition>
  );
};
export default JobApplications;
