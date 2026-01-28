CREATE TABLE `wallet_nonces` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `users` ADD `eth_address` text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_eth_address_unique` ON `users` (`eth_address`);