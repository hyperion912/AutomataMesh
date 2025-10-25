import Link from "next/link";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

type EntityHeaderProps = {
    title: string;
    description?: string;
    newButtonLabel?: string;
    disabled?: boolean;
    isCreating?: boolean;
} & (
    | { onNew: () => void; newButtonhref?: never }
    | { newButtonhref: string; onNew?: never  }
    | { onNew?: never; newButtonhref?: never }
)

export const EntityHeader = ({
    title,
    description,
    newButtonLabel,
    disabled,
    isCreating,
    onNew,
    newButtonhref

}: EntityHeaderProps) => {
    return(
        <div className="flex flex-row items-center justify-between gap-x-4">
            <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
                {description && (<p className="text-xs md:text-sm text-muted-foreground">
                    {description}
                </p>
                )}
            </div>
            {onNew && !newButtonhref && (
                <Button onClick={onNew} disabled={isCreating || disabled} size = "sm">
                    <PlusIcon className="size-4" />
                    <span>{newButtonLabel}</span>
                </Button>
            )}

            {newButtonhref && !onNew && (
                <Button size = "sm" asChild>
                     <Link href={newButtonhref} prefetch>
                         <PlusIcon className="size-4" />
                         <span>{newButtonLabel}</span>
                     </Link>
                </Button>
            )}
        </div>
    )
}

type EntityContainerProps = {
    children: React.ReactNode,
    header: React.ReactNode,
    search: React.ReactNode,
    pagination: React.ReactNode
}

export const EntityContainer = ({ children, header, search, pagination }: EntityContainerProps) => {
    return (
        <div className="p-4 md:px-10 md:py-10 h-full">
            <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full">
                {header}
            <div className="flex flex-col gap-y-4 h-full">
                {search}
                {children}
            </div>

            {pagination}
            </div>
        </div>
    )
}