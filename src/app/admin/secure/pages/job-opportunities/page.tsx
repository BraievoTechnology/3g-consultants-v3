'use client'
import {useEffect, useState} from "react";
import { jobService, Job as ApiJob } from '../../services/jobService'
import {CalendarIcon, MapPinIcon} from "lucide-react";
import {Badge} from "@/app/admin/secure/components/UI/Badge";
import {PageTransition} from "@/app/admin/secure/components/UI/PageTransition";
import {AddButton} from "@/app/admin/secure/components/UI/AddButton";
import {DataTable} from "@/app/admin/secure/components/UI/DataTable";
import {Modal} from "@/app/admin/secure/components/UI/Modal";
import {JobForm} from "@/app/admin/secure/components/Jobs/JobForm";
interface JobFormData {
    title: string;
    type: 'FULLTIME' | 'PARTTIME' | 'CONTRACT' | 'INTERNSHIP';
    department: string;
    location: string;
    deadline: string; // or Date if you're using `Date` objects
    status: 'ACTIVE' | 'DRAFT' | 'CLOSED';
    description: string;
    requirements: string;
}

const JobOpportunities: React.FC = () => {
    const [jobs, setJobs] = useState<ApiJob[]>([])
    const [filteredJobs, setFilteredJobs] = useState<ApiJob[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingJob, setEditingJob] = useState<ApiJob | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [, setIsLoading] = useState(true)
    const fetchJobs = async () => {
        try {
            const data = await jobService.getAllJobs()
            setJobs(data)
            setFilteredJobs(data)
        } catch (error) {
            console.error('Failed to fetch jobs:', error)

        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchJobs()
    }, [])
    useEffect(() => {
        const filtered = jobs.filter((job) => {
            const searchString = searchTerm.toLowerCase()
            return (
                job.job_title.toLowerCase().includes(searchString) ||
                job.department.toLowerCase().includes(searchString) ||
                job.location.toLowerCase().includes(searchString) ||
                job.employment_type.toLowerCase().includes(searchString)
            )
        })
        setFilteredJobs(filtered)
    }, [searchTerm, jobs])
    const handleAddJob = async (data: JobFormData) => {
        try {
            const formattedData = {
                job_title: data.title,
                employment_type: data.type.toUpperCase(),
                department: data.department,
                location: data.location,
                application_deadline: data.deadline,
                status: data.status,
                job_description: data.description,
                requirements: data.requirements,
            }
            await jobService.createJob(formattedData)
            await fetchJobs()
            setIsModalOpen(false)

        } catch (error) {
            console.error('Failed to create job:', error)

        }
    }
    const handleUpdate = async (data: JobFormData) => {
        if (!editingJob) return
        try {
            const formattedData = {
                job_title: data.title,
                employment_type: data.type.toUpperCase(),
                department: data.department,
                location: data.location,
                application_deadline: data.deadline,
                status: data.status,
                job_description: data.description,
                requirements: data.requirements,
            }
            await jobService.updateJob(editingJob.id, formattedData)
            await fetchJobs()
            setIsModalOpen(false)
            setEditingJob(null)

        } catch (error) {
            console.error('Failed to update job:', error)

        }
    }
    const handleDelete = async (job: ApiJob) => {
        if (window.confirm(`Are you sure you want to delete "${job.job_title}"?`)) {
            try {
                await jobService.deleteJob(job.id)
                await fetchJobs()

            } catch (error) {
                console.error('Failed to delete job:', error)

            }
        }
    }
    const handleEdit = (job: ApiJob) => {
        setEditingJob(job)
        setIsModalOpen(true)
    }
    const columns = [
        {
            key: 'job_title',
            header: 'Job Title',
            width: '25%',
            render: (value: string, row: ApiJob) => (
                <div>
                    <div className="font-medium text-gray-900">{value}</div>
                    <div className="text-xs text-gray-500">
                        {row.employment_type === 'FULLTIME'
                            ? 'Full Time'
                            : row.employment_type === 'PARTTIME'
                                ? 'Part Time'
                                : row.employment_type === 'CONTRACT'
                                    ? 'Contract'
                                    : 'Internship'}
                    </div>
                </div>
            ),
        },
        {
            key: 'department',
            header: 'Department',
            width: '15%',
        },
        {
            key: 'location',
            header: 'Location',
            width: '20%',
            render: (value: string) => (
                <div className="flex items-center">
                    <MapPinIcon size={16} className="mr-1 text-gray-400" />
                    <span>{value}</span>
                </div>
            ),
        },
        {
            key: 'application_deadline',
            header: 'Deadline',
            width: '15%',
            render: (value: string) => (
                <div className="flex items-center">
                    <CalendarIcon size={16} className="mr-1 text-gray-400" />
                    <span>{new Date(value).toLocaleDateString()}</span>
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            width: '15%',
            render: (value: string) => (
                <Badge
                    text={value}
                    color={
                        value === 'ACTIVE'
                            ? 'green'
                            : value === 'DRAFT'
                                ? 'gray'
                                : value === 'CLOSED'
                                    ? 'red'
                                    : 'gray'
                    }
                />
            ),
        },
    ]
    return (
        <PageTransition>
            <div className="px-4 py-6 md:px-6 lg:px-8">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-medium">Job Opportunities Management</h2>
                    <AddButton
                        label="Add Job Posting"
                        onClick={() => {
                            setEditingJob(null)
                            setIsModalOpen(true)
                        }}
                    />
                </div>
                <DataTable
                    columns={columns}
                    data={filteredJobs}
                    searchPlaceholder="Search jobs..."
                    filterOptions={{
                        label: 'All Status',
                        options: [
                            {
                                label: 'Active',
                                value: 'ACTIVE',
                            },
                            {
                                label: 'Draft',
                                value: 'DRAFT',
                            },
                            {
                                label: 'Closed',
                                value: 'CLOSED',
                            },
                        ],
                    }}
                    onSearch={setSearchTerm}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setEditingJob(null)
                    }}
                    title={editingJob ? 'Edit Job Posting' : 'Add New Job Posting'}
                >
                    <JobForm
                        onSubmit={editingJob ? handleUpdate : handleAddJob}
                        initialData={editingJob}
                    />
                </Modal>
                <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredJobs.length} of {jobs.length} job postings
                </div>
            </div>
        </PageTransition>
    )
}
export default JobOpportunities
