import { expect } from "@playwright/test";

export const petSchema = {
	"id": expect.any(Number),
	"category": expect.objectContaining({
		"id": expect.any(Number),
		"name": expect.any(String),
	}),
	"name": expect.any(String),
	"photoUrls": expect.arrayContaining([expect.any(String)]),
	"tags": expect.arrayContaining([
		expect.objectContaining({
			"id": expect.any(Number),
			"name": expect.any(String),
		}),
	]),
	"status": expect.any(String),
};
