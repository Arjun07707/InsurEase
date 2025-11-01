import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import { getPayments, getUserPolicies, getPolicies, getUsers } from "@/lib/data";
  import { format, parseISO } from "date-fns";
  
  export default async function AdminPaymentsPage() {
    const payments = await getPayments();
    const userPolicies = await getUserPolicies();
    const policies = await getPolicies();
    const users = await getUsers();
  
    return (
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>All Payments</CardTitle>
            <CardDescription>
              A log of all premium payments across all users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Policyholder</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => {
                  const userPolicy = userPolicies.find(
                    (up) => up.id === payment.userPolicyId
                  );
                  const policy = policies.find(
                    (p) => p.id === userPolicy?.policyId
                  );
                  const user = users.find(u => u.id === userPolicy?.userId);
  
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.invoiceNumber}
                      </TableCell>
                      <TableCell>{user?.name ?? 'N/A'}</TableCell>
                      <TableCell>{policy?.name ?? 'N/A'}</TableCell>
                      <TableCell>${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        {format(parseISO(payment.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            payment.status === "paid" ? "default" : "secondary"
                          }
                          className="capitalize"
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
