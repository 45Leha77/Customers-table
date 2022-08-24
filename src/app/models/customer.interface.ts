export interface CustomerSoftware {
  name?: string | null;
  platform?: string | null;
  softwareId?: string | null;
  softwareType?: string | null;
  subscriptionEnded?: string | null;
  subscriptionStarted?: string | null;
}

export interface Customer {
  id?: number;
  contactName?: string | null;
  contactTelephone?: string | null;
  creationDate?: string | null;
  customerTID?: string | null;
  email?: string | null;
  name?: string | null;
  softwares?: CustomerSoftware[] | null;
  softwareIds?: Number[] | null;
  notes?: string | null;
}
