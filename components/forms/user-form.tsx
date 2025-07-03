'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { User } from '@/db/schema';
import { createUser, updateUser } from '@/server/users';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email()
});

interface UserFormProps {
  user?: User;
}

const UserForm = React.memo(function UserForm({ user }: UserFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
  });

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      console.log(values);
      const userData = {
          ...values,
          password: '1234'
      }
      if(user){
        await updateUser({
          ...userData,
          id: user.id,
        });
        toast("User has been updated.")
      }
      else{
        await createUser(userData);
        toast("User has been created.")
      }
      
      form.reset();
      router.refresh();
    } catch {
      toast.error(user ? "Failed to update user" : "Failed to create user");
    } finally {
      setLoading(false);
    }
  }, [user, form, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='test' {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='test@test.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type='submit'>
          {user ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
});

export default UserForm;
