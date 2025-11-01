import type { User, Policy, UserPolicy, Claim, Payment, PolicyCategory, ClaimStatus } from './types';
import { sub, add, formatISO } from 'date-fns';

const createId = () => Math.random().toString(36).substr(2, 9);

const now = new Date();

export const users: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', createdAt: formatISO(sub(now, { days: 150 })), avatarUrl: 'https://picsum.photos/seed/avatar1/100/100' },
  { id: 'user-2', name: 'Bob Williams', email: 'bob@example.com', role: 'user', createdAt: formatISO(sub(now, { days: 90 })), avatarUrl: 'https://picsum.photos/seed/avatar2/100/100' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', createdAt: formatISO(sub(now, { days: 30 })), avatarUrl: 'https://picsum.photos/seed/avatar3/100/100' },
  { id: 'agent-1', name: 'David Miller', email: 'david@agent.com', role: 'agent', createdAt: formatISO(sub(now, { days: 365 })), avatarUrl: 'https://picsum.photos/seed/avatar4/100/100' },
  { id: 'admin-1', name: 'Eva Green', email: 'eva@admin.com', role: 'admin', createdAt: formatISO(sub(now, { days: 730 })), avatarUrl: 'https://picsum.photos/seed/avatar5/100/100' },
];

export const policies: Policy[] = [
  { id: 'policy-1', name: 'Basic Health Plan', category: 'Health', coverage: 50000, premium: 200, duration: 12, description: 'Essential health coverage for individuals.', terms: 'Covers basic hospitalization and pre-existing conditions after 2 years.' },
  { id: 'policy-2', name: 'Comprehensive Health+', category: 'Health', coverage: 200000, premium: 500, duration: 12, description: 'Extensive health coverage including critical illness and maternity.', terms: 'Full coverage with no waiting period for accidents.' },
  { id: 'policy-3', name: 'SecureLife Term Plan', category: 'Life', coverage: 500000, premium: 300, duration: 120, description: 'A term life insurance plan to secure your family\'s future.', terms: 'Payout upon death of the policyholder. Non-smokers get a discount.' },
  { id: 'policy-4', name: 'AutoProtect Car Insurance', category: 'Vehicle', coverage: 25000, premium: 150, duration: 12, description: 'Comprehensive coverage for your car against damage and theft.', terms: 'Includes third-party liability. No-claim bonus applicable on renewal.' },
  { id: 'policy-5', name: 'Global Voyager', category: 'Travel', coverage: 100000, premium: 100, duration: 1, description: 'Travel insurance for international trips up to 30 days.', terms: 'Covers medical emergencies, trip cancellation, and lost baggage.' },
];

export const userPolicies: UserPolicy[] = [
  { id: 'up-1', userId: 'user-1', policyId: 'policy-1', startDate: formatISO(sub(now, { months: 6 })), endDate: formatISO(add(now, { months: 6 })), status: 'active' },
  { id: 'up-2', userId: 'user-1', policyId: 'policy-4', startDate: formatISO(sub(now, { months: 2 })), endDate: formatISO(add(now, { months: 10 })), status: 'active' },
  { id: 'up-3', userId: 'user-2', policyId: 'policy-2', startDate: formatISO(sub(now, { months: 11 })), endDate: formatISO(add(now, { months: 1 })), status: 'active' },
  { id: 'up-4', userId: 'user-3', policyId: 'policy-5', startDate: formatISO(sub(now, { months: 13 })), endDate: formatISO(sub(now, { months: 1 })), status: 'expired' },
];

export const claims: Claim[] = [
  { id: 'claim-1', userPolicyId: 'up-1', reason: 'Minor surgery hospitalization', date: formatISO(sub(now, { days: 45 })), amount: 2500, status: 'approved', adminRemark: 'All documents verified.' },
  { id: 'claim-2', userPolicyId: 'up-2', reason: 'Car bumper damage', date: formatISO(sub(now, { days: 20 })), amount: 400, status: 'pending' },
  { id: 'claim-3', userPolicyId: 'up-3', reason: 'Emergency room visit', date: formatISO(sub(now, { days: 90 })), amount: 1200, status: 'rejected', adminRemark: 'Condition not covered under policy.' },
  { id: 'claim-4', userPolicyId: 'up-1', reason: 'Routine check-up', date: formatISO(sub(now, { days: 10 })), amount: 150, status: 'pending' },
];

export const payments: Payment[] = [
  { id: 'pay-1', userPolicyId: 'up-1', amount: 200, date: formatISO(sub(now, { months: 6 })), invoiceNumber: 'INV-2023-001', status: 'paid' },
  { id: 'pay-2', userPolicyId: 'up-2', amount: 150, date: formatISO(sub(now, { months: 2 })), invoiceNumber: 'INV-2023-002', status: 'paid' },
  { id: 'pay-3', userPolicyId: 'up-3', amount: 500, date: formatISO(sub(now, { months: 11 })), invoiceNumber: 'INV-2023-003', status: 'paid' },
  { id: 'pay-4', userPolicyId: 'up-3', amount: 500, date: formatISO(add(now, { days: 20 })), invoiceNumber: 'INV-2024-001', status: 'due' },
];

// --- Data Fetching Functions ---

export const getPolicies = async () => policies;
export const getUsers = async () => users;
export const getClaims = async () => claims;
export const getPayments = async () => payments;
export const getUserPolicies = async () => userPolicies;

export const getDashboardStats = async () => {
  const totalUsers = users.filter(u => u.role === 'user').length;
  const totalPoliciesSold = userPolicies.length;
  const totalClaims = claims.length;
  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);

  return {
    totalUsers,
    totalPoliciesSold,
    totalClaims,
    totalRevenue,
  };
};

export const getClaimsByStatus = async () => {
  const statusCounts = claims.reduce((acc, claim) => {
    acc[claim.status] = (acc[claim.status] || 0) + 1;
    return acc;
  }, {} as Record<ClaimStatus, number>);
  return Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
};

export const getMonthlyPremiums = async () => {
    const last6Months = Array.from({ length: 6 }).map((_, i) => sub(now, { months: 5 - i }));
    const paidPayments = payments.filter(p => p.status === 'paid');

    return last6Months.map(month => {
        const monthName = month.toLocaleString('default', { month: 'short' });
        const total = paidPayments
            .filter(p => {
                const paymentDate = new Date(p.date);
                return paymentDate.getMonth() === month.getMonth() && paymentDate.getFullYear() === month.getFullYear();
            })
            .reduce((sum, p) => sum + p.amount, 0);
        return { name: monthName, total };
    });
};
