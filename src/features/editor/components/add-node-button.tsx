"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo } from "react";

export const AddNodeButton = memo(() => {
    return (
        <Button
            onClick={() => {}}
            size="icon"
            variant="outline"
            className="bg-background"
        >
            <PlusIcon />
        </Button>
    );
});

AddNodeButton.displayName = "AddNodeButton";