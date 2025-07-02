import UsersTable from '@/components/userstable';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import UserForm from '@/components/forms/user-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default async function Home() {
  return (
    <div className='flex flex-col gap-4 max-w-7xl mx-auto p-5 md:p-24'>
      <h1 className='text-2xl font-bold'>Users</h1>
      <div className='flex justify-end'>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='mb-4'>
              Add User
              <UserPlus className='size-4' />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new user</DialogTitle>
              <DialogDescription>
                Add new user to the database.
              </DialogDescription>
              <UserForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <UsersTable />
    </div>
  );
}
