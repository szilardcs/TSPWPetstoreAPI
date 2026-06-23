import { faker } from "@faker-js/faker";

export function createPetTestData() {
	return {
		"id": faker.number.int(),
		"category": {
			"id": faker.number.int(),
			"name": faker.animal.type(),
		},
		"name": faker.animal.petName(),
		"photoUrls": [faker.image.url()],
		"tags": [
			{
				"id": faker.number.int(),
				"name": faker.lorem.word(1),
			},
		],
		"status": "available",
	};
}
