import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema } from './schema';
const sql = neon("postgresql://expenseMoney_owner:sYN7KdhDeW9H@ep-empty-hat-a5ha4hl1.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require");
export const db = drizzle(sql, { schema })