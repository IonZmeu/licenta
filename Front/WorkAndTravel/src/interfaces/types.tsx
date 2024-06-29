import dayjs from 'dayjs';

export interface Comment {
  id: number;
  jobId: number | null;
  threadId: number | null;
  userId: number;
  parentId: number | null;
  depth: number;
  username: string;
  commentContent: string;
  children: Comment[] | null;
}

export interface CommentDTO {
  id: number;
  jobId: number | null;
  threadId: number | null;
  userId: number;
  parentId: number | null;
  depth: number;
  likes: number;
  dislikes: number;
  username: string;
  commentContent: string;
  timeCreated: string;
  children: CommentDTO[] | null;
}

export interface Image {
  id: number | string;
  imageUrl: string;
  imageType: string;
}


export interface UserThreadDTO {
  id?: number;
  name?: string;
}

export interface Threadobj {
  id: number | string;
  likes?: number;
  dislikes?: number;
  threadTitle?: string;
  threadContent?: string;
  author?: UserThreadDTO;
  parentThread?: Threadobj;
  responses?: Threadobj[];
  images: Image[];
}

export interface ThreadDTO {
  id: number;
  authorId: number;
  likes?: number;
  dislikes?: number;
  authorName: string;
  threadTitle?: string;
  threadContent?: string;
  timeCreated?: string;
  comments?: Threadobj[];
  images: Image[];
}

export interface ThreadViewProps {
  creatorName: string;
  authorId: string | number;
  date: string | undefined;
  description: string | undefined;
  images: Image[];
  title: string | undefined;
  id: Number;
  onFollow: (id: Number) => void;
}

export interface Skill {
  id: number;
  name: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: number;
}

export interface WorkExperience {
  id: number;
  company: string;
  role: string;
  description: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
}

export interface Profile {
  userId: number; // Assuming userId is a number
  username: string;
  skills: Skill[];
  education: Education[];
  workExperiences: WorkExperience[];
}

export interface ProfileDTOGet {
  userId: number;
  username: string;
  skills: Skill[];
  education: Education[];
  workExperiences: WorkExperience[];
  cvImages: Image[];
  pfpImage: Image;
}
export interface JobsPagesResponse {
  jobs: JobDTO;
  totalPages: number;
}
export interface JobDTO {
  id: number;
  name?: string;
  country?: string;
  job?: string;
  salary?: string;
  userId?: number;
  likes?: number;
  dislikes?: number;
  creatorName?: string;
  currency?: string;
  description?: string;
  timeCreated?: string;
  mainImage?: Image;
}
export interface JobPageDTO {
  id: number;
  name?: string;
  email?: string;
  country?: string;
  latCoordinate: string;
  longCoordinate: string;
  salary?: number;
  userId?: number;
  creatorName?: string;
  currency?: string;
  description?: string;
  images?: Image[];
  comments?: Comment[];
}
export interface Job {
  id: number;
  name?: string;
  email?: string;
  country?: string;
  latCoordinate: string;
  longCoordinate: string;
  job?: string;
  salary?: string;
  currency?: string;
  description?: string;
  contactInfo?: string;
  timeCreated?: string;
  images?: Image[];
  comments?: Comment[];
}

export interface ThreadCreateDTO {
  userId: string | '';
  title: string;
  content: string;
  Images: Array<File>;
}

export interface userDTO {
  username: string;
  email: string;
}
