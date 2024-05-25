import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budget = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull().default(0),
    icon: varchar('icon'),
    createdBy: varchar('created_by').notNull(),
})

export const Expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull().default(0),
    budgetId: integer('budget_id').references(() => Budget.id),
    createdAt: varchar('createdAt').notNull(),
})