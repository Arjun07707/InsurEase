
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { getUserPolicies, getPolicies } from '@/lib/data';
import type { UserPolicy, Policy } from '@/lib/types';


const formSchema = z.object({
  policyId: z.string().min(1, { message: 'Please select a policy.' }),
  amount: z.coerce.number().positive({ message: 'Please enter a valid amount.' }),
  reason: z.string().min(10, { message: 'Please provide a reason (at least 10 characters).' }),
  documents: z.any().optional(),
});

type UserPolicyWithDetails = UserPolicy & { policyDetails?: Policy };

export default function FileClaimPage() {
  const { toast } = useToast();
  const [userPolicies, setUserPolicies] = useState<UserPolicyWithDetails[]>([]);

  useEffect(() => {
    async function loadPolicies() {
      const allPolicies = await getPolicies();
      const allUserPolicies = await getUserPolicies();
      
      // Assuming user-1 is logged in
      const currentUserPolicies = allUserPolicies
        .filter(up => up.userId === 'user-1' && up.status === 'active')
        .map(up => {
            const policyDetails = allPolicies.find(p => p.id === up.policyId);
            return { ...up, policyDetails };
        });

      setUserPolicies(currentUserPolicies);
    }
    loadPolicies();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyId: '',
      amount: 0,
      reason: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Claim Submitted!',
      description: 'Your claim has been successfully submitted for review.',
    });
    form.reset();
  }

  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">File a New Claim</h1>
            <p className="text-muted-foreground">
              Please fill out the form below to start your claim process.
            </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Claim Details</CardTitle>
                <CardDescription>Provide all necessary information for a speedy process.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="policyId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Policy</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a policy to claim against" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {userPolicies.map(up => (
                                <SelectItem key={up.id} value={up.id}>
                                    {up.policyDetails?.name ?? `Policy ID: ${up.policyId}`}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Choose the policy under which you are filing this claim.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Claim Amount ($)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 500.00" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Reason for Claim</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Briefly describe the incident and reason for the claim..."
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="documents"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Supporting Documents</FormLabel>
                        <FormControl>
                            <Input type="file" multiple {...form.register('documents')} />
                        </FormControl>
                         <FormDescription>
                            Upload any relevant documents (e.g., receipts, photos, reports).
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit Claim</Button>
                </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
