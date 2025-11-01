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
  import { getPayments, getUserPolicies, getPolicies } from "@/lib/data";
  import { format, parseISO } from "date-fns";
  
  export default async function PaymentsPage() {
    const paymentsData = await getPayments();
    const userPoliciesData = await getUserPolicies();
    const policiesData = await getPolicies();
  
    // Assuming a logged-in user with id 'user-1'
    const currentUserPolicies = userPoliciesData.filter(
      (up) => up.userId === "user-1"
    );
    const currentUserPolicyIds = currentUserPolicies.map((up) => up.id);
    const currentUserPayments = paymentsData.filter((p) =>
      currentUserPolicyIds.includes(p.userPolicyId)
    );
  
    return (
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              An overview of all your premium payments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUserPayments.map((payment) => {
                  const userPolicy = userPoliciesData.find(
                    (up) => up.id === payment.userPolicyId
                  );
                  const policy = policiesData.find(
                    (p) => p.id === userPolicy?.policyId
                  );
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.invoiceNumber}
                      </TableCell>
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
