// Re-export all types from different modules
export * from './user'
export * from './product'
export * from './common'
export * from './merchant'

// Common type utilities
export type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type Nullable<T> = T | null

export type Maybe<T> = T | undefined

// Database entity base
export interface BaseEntity {
	id: string
	createdAt: Date
	updatedAt?: Date
}