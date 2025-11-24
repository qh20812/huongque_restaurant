import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
			{children}
		</div>
	)
}
