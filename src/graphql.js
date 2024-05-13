const axios = require("axios");
const _ = require("lodash");

const throwOnErrors = ({ query, variables, errors }) => {
	if (errors) {
		// For readability,
		// we're going to log the query, variables, and errors
		const errorMessage = `
            query: ${query.substring(0, 100)}

            variables: ${JSON.stringify(variables, null, 2)}

            errors: ${JSON.stringify(errors, null, 2)}
        `;

		throw new Error(errorMessage);
	}
};

const GraphQL = async (url, query, variables, auth) => {
	const headers = {};

	if (auth) {
		headers.Authorization = auth;
	}

	try {
		const response = await axios({
			method: "POST",
			url,
			headers,
			data: {
				query,
				variables: JSON.stringify(variables),
			},
		});

		const { data, errors } = response.data;

		// Still throw an error if there are errors.
		// This is because Appsync, or GraphQL servers in general,
		// will return a 200 status code even if there are errors.
		throwOnErrors({ query, variables, errors });
		return data;
	} catch (error) {
		const errors = _.get(error, "response.data.errors");
		throwOnErrors({ query, variables, errors });
		return error;
	}
};

module.exports = GraphQL;
