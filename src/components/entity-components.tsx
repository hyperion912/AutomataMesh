import Link from "next/link";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

type EntityHeaderProps = {
    title: string;
    description?: string;
    newButtonLabel?: string;
    disabled?: boolean;
    isCreating?: boolean;
} & (
    | { onNew: () => void; newButtonhref?: never }
    | { newButtonhref: string; onNew?: never }
    | { onNew?: never; newButtonhref?: never }
);

export const EntityHeader = ({
    title,
    description,
    newButtonLabel,
    disabled,
    isCreating,
    onNew,
    newButtonhref,
}: EntityHeaderProps) => {
    return (
        <div className="flex flex-row items-center justify-between gap-x-4">
            <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
                {description && (
                    <p className="text-xs md:text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            {onNew && !newButtonhref && (
                <Button
                    onClick={onNew}
                    disabled={isCreating || disabled}
                    size="sm"
                >
                    <PlusIcon className="size-4" />
                    <span>{newButtonLabel}</span>
                </Button>
            )}

            {newButtonhref && !onNew && (
                <Button size="sm" asChild>
                    <Link href={newButtonhref} prefetch>
                        <PlusIcon className="size-4" />
                        <span>{newButtonLabel}</span>
                    </Link>
                </Button>
            )}
        </div>
    );
};

type EntityContainerProps = {
    children: React.ReactNode;
    header: React.ReactNode;
    search: React.ReactNode;
    pagination: React.ReactNode;
};

export const EntityContainer = ({
    children,
    header,
    search,
    pagination,
}: EntityContainerProps) => {
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
    );
};

interface EntitySearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const EntitySearch = ({
    value,
    onChange,
    placeholder = "Search",
}: EntitySearchProps) => {
    return (
        <div className="relative ml-auto">
            <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
                className="max-w-[200px] bg-background shadow-none border-border pl-8"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

interface EntityPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}

export const EntityPagination = ({
    page,
    totalPages,
    onPageChange,
    disabled,
}: EntityPaginationProps) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page} of {totalPages || 1}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button disabled = {page===1 || disabled} onClick={() => {onPageChange(Math.max(1, page-1))}} variant="outline" size="sm">
                    Previous
                </Button>

                <Button disabled = {page===totalPages || totalPages===0 || disabled} onClick={() => {onPageChange(Math.min(totalPages, page+1))}} variant="outline" size="sm">
                    Next
                </Button>
            </div>
            
        </div>

    )
}
