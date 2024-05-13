export function request(ctx) {
	return {
		payload: ctx.args.data,
	};
}

export function response(ctx) {
	return ctx.result;
}
