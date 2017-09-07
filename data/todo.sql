CREATE TABLE `list` (
	`id` int NOT NULL AUTO_INCREMENT,
	`description` varchar(128) NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `item` (
	`id` int NOT NULL AUTO_INCREMENT,
	`description` varchar(128) NOT NULL,
	`list_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
	`id` int NOT NULL AUTO_INCREMENT,
	`username` varchar(32) NOT NULL UNIQUE,
	`password` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `list` ADD CONSTRAINT `list_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

ALTER TABLE `item` ADD CONSTRAINT `item_fk0` FOREIGN KEY (`list_id`) REFERENCES `list`(`id`);
