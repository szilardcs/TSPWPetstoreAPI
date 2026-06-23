import { expect, test } from "@playwright/test";
import { createPetTestData } from "../factories/createPetData.factory";
import { petSchema } from "../schemas/PetSchema";

test.describe.serial("Petstore pet tests", async () => {
	let petID: number;
	const petData = createPetTestData();
	const api_key = process.env.API_KEY!;

	test("Post Pet", async ({ request }) => {
		const response = await request.post("https://petstore.swagger.io/v2/pet", {
			headers: { "Content-Type": "application/json" },
			data: petData,
		});
		const responseBody = await response.json();
		petID = responseBody.id;

		expect(response.status()).toBe(200);
		expect(responseBody).toMatchObject(petSchema);
	});

	test("Get pet", async ({ request }) => {
		const response = await request.get(`https://petstore.swagger.io/v2/pet/${petID}`, {
			headers: { "Content-Type": "application/json" },
		});
		const responseBody = await response.json();

		expect(response.status()).toBe(200);
		expect(responseBody).toMatchObject(petData);
		expect(responseBody).toMatchObject(petSchema);
	});

	test("Update pet", async ({ request }) => {
		const response = await request.put("https://petstore.swagger.io/v2/pet", {
			headers: { "Content-Type": "application/json" },
			data: {
				id: petID,
				name: "Buksi",
				status: "No fleas",
				category: petData.category,
				photoUrls: petData.photoUrls,
				tags: petData.tags,
			},
		});
		const responseBody = await response.json();

		expect(response.status()).toBe(200);
		expect(responseBody).not.toMatchObject(petData);
		expect(responseBody).toMatchObject(petSchema);
	});

	test("Get pet again", async ({ request }) => {
		const response = await request.get(`https://petstore.swagger.io/v2/pet/${petID}`, {
			headers: { "Content-Type": "application/json" },
		});
		const responseBody = await response.json();

		expect(response.status()).toBe(200);
		expect(responseBody.name).toBe("Buksi");
		expect(responseBody.status).toBe("No fleas");
		expect(responseBody).not.toMatchObject(petData);
		expect(responseBody).toMatchObject(petSchema);
	});

	test("Delete pet", async ({ request }) => {
		const response = await request.delete(`https://petstore.swagger.io/v2/pet/${petID}`, {
			headers: {
				"Content-Type": "application/json",
				"api_key": api_key,
			},
		});

		const responseBody = await response.json();
		expect(response.status()).toBe(200);
		expect(responseBody.message).toBe(String(petID));
	});

	test("Verify pet deleted", async ({ request }) => {
		const response = await request.get(`https://petstore.swagger.io/v2/pet/${petID}`, {
			headers: { "Content-Type": "application/json" },
		});
		expect(response.status()).toBe(404);
	});
});
