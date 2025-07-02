'use server';

import { db } from '@/db/drizzle';
import { User, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getUsers() {
    try {
        const allUsers = await db.select().from(users);
        return allUsers;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
        const newUser = await db.insert(users).values(userData).returning();
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
}

export async function deleteUser(userData : Omit<User, 'email' | 'username' | 'password' | 'createdAt' | 'updatedAt'>) {
    try {
        const deletedUser = await db
            .delete(users)
            .where(eq(users.id, userData.id))
            .returning();
        return deletedUser;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
    }
}
export async function updateUser(
    userData: Omit<User, 'createdAt' | 'updatedAt'> & { id: string }
) {
    try {
        const updatedUser = await db
            .update(users)
            .set({ ...userData, updatedAt: new Date() })
            .where(eq(users.id, userData.id))
            .returning();
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
    }
}
    
