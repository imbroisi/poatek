import { Dispatch, SetStateAction } from 'react';

/* istanbul ignore file */
interface Headshot {
  alt:      string;
  height:   number;
  id:       string;
  mimeType: string;
  type:     string;
  url:      string;
  width:    number;
}

export interface Employee {
  firstName:   string;
  headshot:    Headshot;
  id:          string;
  jobTitle:    string;
  lastName:    string;
  slug:        string;
  socialLinks: any[];
  type:        string;
  curretEmployee?: boolean;
}

export interface Context {
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  employeersChosen: Employee[];
  getSixEmployees: () => void;
  attempts: number;
  addAttempts: () => void;
  correctAnswers: number;
  addCorrectAnswers: () => void;
  reset: () => void;
}
