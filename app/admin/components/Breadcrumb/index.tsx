"use client";
import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;
  const normalized = items.map((item, idx) => {
    if (idx === items.length - 1 && item.current === undefined) {
      return { ...item, current: true };
    }
    return item;
  });

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap gap-2 mb-2">
        {normalized.map((item, idx) => (
          <React.Fragment key={idx}>
            {item.href && !item.current ? (
              <li>
                <a
                  href={item.href}
                  className="text-text-muted-light dark:text-primary/70 text-base font-medium leading-normal hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ) : (
              <li
                className={
                  item.current
                    ? "text-text-light dark:text-background-light text-base font-medium leading-normal"
                    : "text-text-muted-light dark:text-primary/70 text-base font-medium leading-normal"
                }
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </li>
            )}
            {idx < normalized.length - 1 && (
              <li className="text-text-muted-light dark:text-primary/70 text-base font-medium leading-normal">/</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
