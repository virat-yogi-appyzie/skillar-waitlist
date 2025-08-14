"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const discoveryOptions = [
  {
    value: "search-engine",
    label: "Search Engine",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
  },
  {
    value: "other-social-media",
    label: "Other Social Media",
  },
  {
    value: "google-ads",
    label: "Google Ads",
  },
  {
    value: "appian",
    label: "Appian",
  },
  {
    value: "known-contact",
    label: "Known Contact",
  },
  {
    value: "blog-article",
    label: "Blog & Article",
  },
  {
    value: "others",
    label: "Others",
  },
]

interface DiscoveryComboboxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function DiscoveryCombobox({
  value,
  onChange,
  placeholder = "Select how you discovered us...",
  className,
}: DiscoveryComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal",
            // Match your existing form-control styles
            "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)]",
            "hover:bg-[var(--bg-card)] hover:border-[var(--border-color)]",
            "focus:border-[var(--accent-blue)] focus:ring-0 focus:ring-offset-0",
            "h-auto min-h-[44px] px-4 py-3 rounded-[var(--radius-base)]",
            "transition-all duration-150 ease-[var(--ease-standard)]",
            !value && "text-[var(--text-secondary)]",
            className
          )}
          style={{
            fontSize: 'var(--font-size-md)',
            lineHeight: '1.5',
          }}
        >
          <span className="truncate">
            {value
              ? discoveryOptions.find((option) => option.value === value)?.label
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "w-full p-0 border-[var(--border-color)]",
          "bg-[var(--bg-card)] shadow-lg rounded-[var(--radius-base)]"
        )}
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <Command className="bg-transparent">
          <CommandList className="max-h-[200px] overflow-auto">
            <CommandEmpty className="py-6 text-center text-[var(--text-secondary)] text-sm">
              No discovery source found.
            </CommandEmpty>
            <CommandGroup>
              {discoveryOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center px-4 py-3",
                    "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
                    "transition-colors duration-150 ease-[var(--ease-standard)]",
                    "data-[selected]:bg-[var(--bg-secondary)]"
                  )}
                  style={{
                    fontSize: 'var(--font-size-md)',
                  }}
                >
                  <Check
                    className={cn(
                      "mr-3 h-4 w-4 text-[var(--accent-blue)]",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}