export interface Job {
  id: number;
  job_title: string;
  employment_type: "FULLTIME" | "PARTTIME" | "CONTRACT";
  department: string;
  location: string;
  application_deadline: string;
  status: "ACTIVE" | "INACTIVE";
  job_description: string;
  requirements: string;
}