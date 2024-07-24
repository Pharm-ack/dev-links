"use client";
import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { link } from "@/components/link/LinkMain";

type FormInputProps = {
  label: string;
  linkId: number;
  type: string;
  wrapperClass: string;
  id: string;
  name: string;
  placeholder: string;
  className?: string;
  src: string;
  value: string;
  setNewLinks: React.Dispatch<React.SetStateAction<link[] | null>>;
  props?: React.ComponentPropsWithoutRef<"input">;
  error?: string;
};

function LinkForm({
  linkId,
  label,
  type,
  src,
  id,
  name,
  placeholder,
  wrapperClass,
  className,
  error,
  value,
  setNewLinks,
  props,
}: FormInputProps) {
  return (
    <div className={cn("", wrapperClass)}>
      <label htmlFor={id} className="body-s">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
          <Image
            alt="email icon"
            className="h-4 w-4"
            src={src as string}
            width={32}
            height={32}
          />
        </div>
        {error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="body-s text-destructive" role="alert">
              {error.split(",")[0]}
            </span>
          </div>
        )}
        <Input
          value={value}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={cn(
            "pl-12",
            error ? "error-ring pr-24" : "pr-4",
            className
          )}
          {...props}
          onChange={(e) => {
            setNewLinks((links) => {
              if (links) {
                const newLinks = links.map((link) => {
                  if (link.id === linkId) {
                    return { ...link, url: e.target.value };
                  }
                  return link;
                });
                return newLinks;
              }
              return links;
            });
          }}
        />
      </div>
    </div>
  );
}

export default LinkForm;
