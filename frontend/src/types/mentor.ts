export type MentorType = {
  id: number;
  firstname: string;
  lastname: string;
  department: string;
};

export type MentorData = {
  success: boolean;
  data: MentorType;
};
