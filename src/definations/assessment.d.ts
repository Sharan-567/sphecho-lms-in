export interface Question {
  id: number;
  marks: number;
  question: string;
  answer: string;
  solution_url?: string;
  correct_option: string;
  option_01: string;
  option_02: string;
  option_03: string;
  option_04: string;
  option_05: string;
  match_a: string;
  match_1: string;
  match_b: string;
  match_2: string;
  match_c: string;
  match_3: string;
  match_d: string;
  match_4: string;
  match_e: string;
  match_5: string;
  match_f: string;
  match_6: string;
  cnt: number;
  topic: number;
  type: number;
}
export type Assessment = {
  customId: number;
  id: number;
  name: string;
  pre_assesment: boolean;
  order: number;
  max_marks: number;
  min_marks_to_qualify: number;
  course: number;
  topic: number;
  parent: number;
  question: number[];
};

export type Badge = {
  "id": number,
  "title": string,
  "on_complition": boolean,
  "on_attend": false,
  "image": string,
  "numbers": number,
  "start_date":Date,
  "end_date": Date,
  "topic": number,
  "course": number,
  "assesment": number
}