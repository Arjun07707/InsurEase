import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { userPolicies, policies, users } from "@/lib/data";
import { format, parseISO } from "date-fns";

export default function AgentSalesPage() {
  // Assuming agent-1 is logged in, and their clients are user-1 and user-2
  const agentClientIds = ['user-1', 'user-2'];
  const agentSales = userPolicies.filter(up => agentClientIds.includes(up.userId));

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Policy Sales</CardTitle>
          <CardDescription>A record of all policies sold to your clients.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Policy</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Premium</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentSales.map(up => {
                const client = users.find(u => u.id === up.userId);
                const policy = policies.find(p => p.id === up.policyId);
                
                return (
                  <TableRow key={up.id}>
                    <TableCell className="font-medium">{client?.name}</TableCell>
                    <TableCell>{policy?.name}</TableCell>
                    <TableCell>{format(parseISO(up.startDate), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{format(parseISO(up.endDate), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="text-right">${policy?.premium.toLocaleString()}</TableCell>
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
