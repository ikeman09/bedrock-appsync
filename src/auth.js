module.exports.handler = async (event) => {
	return {
		isAuthorized: true,
		resolverContext: {},
		deniedFields: [],
	};
};
