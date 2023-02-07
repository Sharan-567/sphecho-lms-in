import { number } from "yup";

export interface Course {
  id: number;
  name?: string;
  tags?: string;
  info_image?: string;
  description?: string;
  trainer_name?: string;
  trainer_imag?: string;
  full_amount?: string;
  sample_ur?: string;
  view_all?: boolean;
  enroll_all?: boolean;
  featured?: boolean;
  owner?: number[];
  sample_url?: string;
}

export interface StudentCourse {
  id?: number;
  unique_code?: string;
  active_till?: Date;
  date?: Date;
  student?: number;
  course?: number;
  group?: number;
  no_of_topics?: number;
}

export type Topic = {
  customId: number;
  id: number;
  name: string;
  info_image: string;
  video?: string;
  caption_file_url?: string;
  pdf?: string;
  image?: string;
  content?: string;
  description?: string;
  assement_required: boolean;
  max_marks?: number;
  min_marks_to_qualify?: number;
  order: number;
  overview?: string;
  owner: number;
  course: number;
  parent?: number;
  volume_parent: number;
};

export interface Progress {
  id: number;
  datetime: Date;
  page_no: number;
  tracker: number;
  completed: boolean;
  student: number;
  course: number;
  topic: number;
  assesment: number;
}

export type NormalizedProgress = Record<
  string,
  { topics: number[]; assesments: number[] }
>;

export type Certificate = {
  id: number;
  title: string;
  on_complition: boolean;
  on_attend: boolean;
  background_image: string;
  text: string;
  topic: number;
  course: number;
  assesment: number;
};
