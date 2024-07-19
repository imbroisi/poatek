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
