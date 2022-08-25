export interface CustomerSoftware {
  name?: string;
  platform?: string;
  softwareId?: string;
  softwareType?: string;
  subscriptionEnded?: string;
  subscriptionStarted?: string;
}

export interface Customer {
  id?: number;
  contactName?: string;
  contactTelephone?: string;
  creationDate?: string;
  customerTID?: string;
  email?: string;
  name?: string;
  softwares?: CustomerSoftware[];
  softwareIds?: Number[];
  notes?: string;
}
