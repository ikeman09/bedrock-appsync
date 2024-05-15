export function request(ctx) {
	return {
		payload: ctx.args.chunk,
	};
}

export function response(ctx) {
	return ctx.result;
}
