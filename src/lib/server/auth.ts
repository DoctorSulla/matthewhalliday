// Interface for a single session row returned from D1
interface SessionRow {
	user: string;
	expiry: number;
	session_token: string;
}

// Basic D1Result interface for type safety when querying
interface D1Result<T = any> {
	results: T[];
	success: boolean;
	error?: string;
}

/**
 * Checks if a session cookie is valid and not expired.
 * @param cookie_value The session token from the cookie.
 * @param platform The platform object containing D1 environment variables.
 * @returns True if the session is valid and active, false otherwise.
 */
export async function checkCookie(cookie_value: string, platform: App.Platform): Promise<boolean> {
	try {
		const query = `
SELECT * FROM SESSIONS WHERE session_token=?
		`;

		const res: D1Result<SessionRow> = await platform.env.halliday_db
			.prepare(query)
			.bind(cookie_value)
			.all();

		// Check if results exist and the session is not expired
		if (res.results && res.results.length > 0 && res.results[0].expiry > new Date().getTime()) {
			return true;
		}
		return false;
	} catch (err) {
		console.error('Error querying D1 sessions:', err);
		return false;
	}
}
