import { Worker } from "@notionhq/workers";
import { j } from "@notionhq/workers/schema-builder";

const worker = new Worker();
export default worker;

// Sends a message to a Discord channel via a webhook URL provided by the caller.
worker.tool("sendDiscordMessage", {
	title: "Send Discord Message",
	description: "Sends a message to a Discord channel via a Discord webhook.",
	schema: j.object({
		webhookUrl: j.string().describe("The Discord webhook URL to send the message to."),
		content: j.string().describe("The message text to send to Discord."),
		username: j
			.string()
			.describe("Override the webhook's default username for this message.")
			.nullable(),
		avatarUrl: j
			.string()
			.describe("Override the webhook's default avatar URL for this message.")
			.nullable(),
	}),
	outputSchema: j.object({
		success: j.boolean(),
	}),
	execute: async ({ webhookUrl, content, username, avatarUrl }) => {
		if (!webhookUrl) {
			throw new Error("webhookUrl is required.");
		}

		const res = await fetch(webhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content,
				username: username ?? undefined,
				avatar_url: avatarUrl ?? undefined,
			}),
		});

		if (!res.ok) {
			const body = await res.text();
			throw new Error(`Discord webhook request failed (${res.status}): ${body}`);
		}

		return { success: true };
	},
});
