import axios from "axios";
import { API_URL } from "./consts";
import { v4 } from "uuid";

class Api {
	async get(endpoint, params) {
		const response = await axios.get(`${API_URL}/${endpoint}`);
		return response;
	}

	async post(endpoint, body) {
		const response = await axios.post(`${API_URL}/${endpoint}`, { ...body });
		return response;
	}

	put() {}

	delete() {}
}

const api = new Api();

class AuthService {
	async register(loginData) {
		const response = await api.post("users", { id: v4(), ...loginData });

		if (response.data.email && response.data.password) {
			return response.data;
		} else {
			return false;
		}
	}

	async login(loginData) {
		const response = await api.get(`users?email=${loginData.email}`);
		if (
			loginData.password === response.data[0].password &&
			loginData.email === response.data[0].email
		) {
			return response.data;
		} else {
			return false;
		}
	}

	async hello() {
		const response = await api.get("hello");

		return response;
	}
}

export const authService = new AuthService();
