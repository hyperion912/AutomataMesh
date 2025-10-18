"use client"
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

/**
 * Render a logout button that signs the current user out when clicked.
 *
 * @returns A JSX element: a button labeled "Logout" which calls `authClient.signOut()` on click.
 */
export function Btn() {
  
  return (

     <Button onClick={async ()=>{await authClient.signOut()}}>Logout</Button>
  );
}