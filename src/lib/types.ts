export type UserRole = 'admin' | 'agent' | 'user';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
  avatarUrl: string;
};

export type PolicyCategory = 'Health' | 'Life' | 'Vehicle' | 'Travel';

export type Policy = {
  id: string;
  name: string;
  category: PolicyCategory;
  coverage: number;
  premium: number;
  duration: number; // in months
  description: string;
  terms: string;
};

export type UserPolicy = {
  id: string;
  userId: string;
  policyId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
};

export type ClaimStatus = 'pending' | 'approved' | 'rejected';

export type Claim = {
  id: string;
  userPolicyId: string;
  reason: string;
  date: string;
  amount: number;
  status: ClaimStatus;
  adminRemark?: string;
  documents?: string[];
};

export type Payment = {
  id: string;
  userPolicyId: string;
  amount: number;
  date: string;
  invoiceNumber: string;
  status: 'paid' | 'due';
};

export type Agent = {
  id: string;
  name: string;
  email: string;
  commissionRate: number; // percentage
  clients: string[]; // array of user IDs
};
