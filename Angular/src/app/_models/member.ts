import {Photo} from './photo'
import {Followers} from "./followers";

export interface Member {
  id: number;
  username: string;
  photoUrl: string;
  age: number;
  knownAs: string;
  email: string;
  created: Date;
  lastActive: Date;
  gender: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;

  followers: Followers[];

  photos: Photo[];
}

