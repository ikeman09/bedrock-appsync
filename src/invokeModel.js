const {
	BedrockRuntimeClient,
	InvokeModelWithResponseStreamCommand,
} = require("@aws-sdk/client-bedrock-runtime");
const GraphQL = require("./graphql");

module.exports.handler = async (event) => {
	const client = new BedrockRuntimeClient({
		region: "us-east-1",
	});

	const prompt = "Create me an article about amazon bedrock";
	const claudPrompt = `\n\nHuman:${prompt}\n\nAssistant:`;

	const body = {
		prompt: claudPrompt,
		max_tokens_to_sample: 300,
		temperature: 0.5,
		top_k: 250,
		top_p: 0.5,
		stop_sequences: [],
	};

	const params = {
		modelId: "anthropic.claude-v2",
		stream: true,
		contentType: "application/json",
		accept: "*/*",
		body: JSON.stringify(body),
	};

	console.log(params);

	const command = new InvokeModelWithResponseStreamCommand(params);

	let response,
		chunks = [];

	response = await client.send(command);

	for await (const chunk of response.body) {
		const parsed = JSON.parse(
			Buffer.from(chunk.chunk.bytes, "base64").toString("utf-8")
		);
		chunks.push(parsed.completion);

		// send the chunk to to the send mutation
		const mutation = `mutation send($data: String!) {
			send(data: $data)
		}`;

		const variables = {
			data: parsed.completion,
		};

		await GraphQL(process.env.API_URL, mutation, variables, "test");
	}

	return true;
};
