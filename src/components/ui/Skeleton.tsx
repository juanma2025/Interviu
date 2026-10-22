import React from 'react'

export interface SkeletonProps {
  className?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

export function Skeleton({ className = 'h-4 w-full', rounded = 'md' }: SkeletonProps) {
  const roundClasses = {
    sm: 'rounded-[8px]',
    md: 'rounded-[12px]',
    lg: 'rounded-[20px]',
    full: 'rounded-full',
  }

  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-[var(--line-subtle)] ${roundClasses[rounded]} ${className}`}
    />
  )
}
