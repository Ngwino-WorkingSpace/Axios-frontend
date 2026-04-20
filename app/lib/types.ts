export type IdLike = string;

export type ApiListResponse<T> = {
  data?: T[];
};

export type Candidate = {
  _id?: IdLike;
  id?: IdLike;
  firstName?: string;
  lastName?: string;
  email?: string;
  headline?: string;
  location?: string;
  source?: string;
  createdAt?: string;
  status?: string;
  job?: {
    title?: string;
    department?: string;
  };
  appliedJob?: {
    title?: string;
  };
  bio?: string;
  skills?: Array<string | { name?: string; yearsOfExperience?: number }>;
  languages?: Array<string | { name?: string }>;
  certifications?: Array<string | { name?: string; issuer?: string }>;
  experience?: Array<{
    role?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    description?: string;
    technologies?: string[];
  }>;
  projects?: Array<{ name?: string; description?: string }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    fieldOfStudy?: string;
    startYear?: string | number;
    endYear?: string | number;
  }>;
  socialLinks?: { linkedin?: string; github?: string; portfolio?: string };
  evaluations?: Array<{ matchScore?: number; reasoning?: string }>;
};

export type Job = {
  _id?: IdLike;
  id?: IdLike;
  title?: string;
  department?: string;
  location?: string;
  status?: string;
  createdAt?: string;
  description?: string;
  requiredSkills?: string[];
  shortlistSize?: number;
  candidateCount?: number;
  totalApplicants?: number;
  candidates?: unknown[];
  scoringWeights?: Record<string, number>;
};

