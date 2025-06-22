interface Member {
  name: string;
  nickname: string;
  role: string;
  weapon: string;
  specialties: string[];
  image?: string;
}

export interface Section {
  name: string;
  members: Member[];
}