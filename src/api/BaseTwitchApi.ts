import type TokenResponse from "../interfaces/TokenResponse";
import { AxiosRequestConfig, AxiosError } from "axios";
import config from "../config";
import api from "./api";

/** URL para solicitar tokens de autenticação da API da twitch */
export const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';

export default class BaseTwitchApi {
    /** Token de autenticação da Twitch */
    private static token: string | null = null;

    public static async init() {
        while (this.token == null) {
            try {
                await this.requestToken();
            } catch (error) {
                console.log(error);
            }
        }
    }

    public static async request<TResponse>(params: AxiosRequestConfig) {
        while (true) {
            try {
                return await api<TResponse>({
                    headers: {
                        'Client-ID': config.TWITCH_CLIENT_ID,
                        'Authorization': `Bearer ${this.token}`
                    },
                    ...params
                });
            } catch (error) {
                if (!(error instanceof AxiosError) || error.status != 401) {
                    throw error;
                }

                await this.requestToken();
            }
        };
    }

    private static async requestToken() {
        const { data } = await api<TokenResponse>({
            method: 'POST',
            url: TWITCH_TOKEN_URL,
            data: {
                client_id: config.TWITCH_CLIENT_ID,
                client_secret: config.TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials'
            }
        });

        const token = data.access_token;
        if (!token) {
            throw new Error("Token de autenticação da Twitch não encontrado");
        }

        this.token = token;
    }
}