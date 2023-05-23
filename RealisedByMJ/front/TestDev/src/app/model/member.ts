import { Factory } from './factory';
export class Member {
  id: number;
  email: string;
  typeMember: string;
  firstName: string;
  lastName: string;
  phone: string;
  language: string;
  factory?: Factory;
  photo: string;
  isActivated: boolean;
  created_at: string;
  has_questions: boolean;
  professionId: string;
  typePhone: string;
  updated_at: string;
}
