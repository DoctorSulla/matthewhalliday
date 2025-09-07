import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
	if (!cookies.get("loggedIn")) {
		redirect(307, "/login");
	}
}

export const actions = {
	default: async ({ }) => {
		// NO OP
	},
};
