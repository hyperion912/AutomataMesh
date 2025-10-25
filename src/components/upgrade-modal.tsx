"use-client"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogAction,
    
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";

interface UpgradeModalProps {
    Open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({ Open, onOpenChange }: UpgradeModalProps) => {
    return(
    <AlertDialog open={Open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Upgrade to Pro
                </AlertDialogTitle>
            <AlertDialogDescription>
                You need an active subscription to perform this action Upgrade to Pro to unlock all features.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>authClient.checkout({slug: "AutomataMesh-Pro"})}>Upgrade Now</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}