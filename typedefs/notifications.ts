export interface Notification {
  policyId: string;
  agentId: string;
  updaterAgentId: string;
  read: boolean;
  createdAt: Date;
  _id?: string;
}

export interface ExpiringPolicies {
  _id: string;
  creator: string;
  updatedByAgent: string;
}
