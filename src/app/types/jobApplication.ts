export interface JobApplicationSkill {
  id: number;
  skill: string;
  jobApplicationId: number;
}
export interface JobApplication {
  id: number;
  name: string;
  email: string;
  contact?: string;
  experience?: string;
  expected_salary?: number;
  cv_name?: string;
  cover_letter?: string;
  skills: JobApplicationSkill[];
  jobOpportunityId: number;
}
export interface CreateJobApplicationDTO {
  name: string;
  email: string;
  contact?: string;
  experience?: string;
  expected_salary?: number;
  cv?: File;
  cover_letter?: File;
  skills: string[];
  jobOpportunityId: number;
}