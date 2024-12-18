CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`user_id` text NOT NULL,
	`is_completed` integer DEFAULT false,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
