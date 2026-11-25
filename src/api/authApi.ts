const API_URL = import.meta.env.VITE_API_URL;

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name?: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token?: string;
    message?: string;
    user?: {
        id: string | number;
        email: string;
        name?: string;
    };
}

async function requestAuth<T>(endpoint: string, body: unknown): Promise<T> {
    if (!API_URL) {
        throw new Error('Falta configurar VITE_API_URL en las variables de entorno.');
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || 'Correo electronico o contraseña incorrecta.');
    }
    console.log(data)
    return data as T;
}

export function loginUser(credentials: LoginPayload): Promise<AuthResponse> {
    return requestAuth<AuthResponse>('/api/user/login', credentials);
}

export function registerUser(userData: RegisterPayload): Promise<AuthResponse> {
    return requestAuth<AuthResponse>('/api/user/registeruser', userData);
}