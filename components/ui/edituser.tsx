'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import UserForm from '@/components/forms/user-form';
import { User } from '@/db/schema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EditUserProps {
  user: User;
}

const EditUser = React.memo(function EditUser({ user }: EditUserProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <Pencil className='size-4'/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>
            Update user information in the database.
          </DialogDescription>
          <UserForm user={user} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
});

export default EditUser;
