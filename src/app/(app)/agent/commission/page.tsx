import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { payments, userPolicies, policies, users } from "@/lib/data";
import { format, parseISO } from "date-fns";

export default function AgentCommissionPage() {
  const commissionRate = 0.05; // 5%
  // Assuming agent-1 is logged in, and their clients are user-1 and user-2
  const agentClientIds = ['user-1', 'user-2'];
  const agentClientPolicies = userPolicies.filter(up => agentClientIds.includes(up.userId));
  const agentClientPolicyIds = agentClientPolicies.map(up => up.id);

  const relevantPayments = payments.filter(p => agentClientPolicyIds.includes(p.userPolicyId) && p.status === 'paid');

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Commission Report</CardTitle>
          <CardDescription>Your earnings from policy sales.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-6">
                <p className="text-sm text-muted-foreground">Total Commission Earned</p>
                <p className="text-3xl font-bold">${(relevantPayments.reduce((acc, p) => acc + p.amount, 0) * commissionRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Policyholder</TableHead>
                <TableHead>Policy</TableHead>
                <TableHead>Premium Paid</TableHead>
                <TableHead className="text-right">Commission Earned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relevantPayments.map(payment => {
                const userPolicy = userPolicies.find(up => up.id === payment.userPolicyId);
                const policy = policies.find(p => p.id === userPolicy?.policyId);
                const user = users.find(u => u.id === userPolicy?.userId);
                const commission = payment.amount * commissionRate;

                return (
                  <TableRow key={payment.id}>
                    <TableCell>{format(parseISO(payment.date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{policy?.name}</TableCell>
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium">${commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
