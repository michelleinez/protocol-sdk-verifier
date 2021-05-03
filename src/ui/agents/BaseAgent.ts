import {IBaseAgent} from "../interfaces/AgentInterfaces";

export default class BaseAgent implements IBaseAgent {

    async baseFunction(request: Promise<any>, callback: (data: any) => any, error?: string): Promise<any> {
        try {
            const connection: any = await request;

            return Promise.resolve(callback(connection));
        } catch (e) {
            const msg: string = error || e.message;
            return Promise.reject(msg);
        }
    }

    async profiles(request: Promise<any>, callback: (data: any) => any, error?: string): Promise<any> {
        return this.baseFunction(request, callback, error);
    }

    async establish(request: Promise<any>, callback: (data: any) => any, error?: string): Promise<any> {
        return this.baseFunction(request, callback, error);
    }

    async check(request: Promise<any>, callback: (data: any) => any, error?: string): Promise<any> {
        return this.baseFunction(request, callback, error);
    }

    async send(request: Promise<any>, callback: (data: any) => any, error?: string): Promise<any> {
        return this.baseFunction(request, callback, error);
    }

    async prove(request: Promise<any>, callback: (data: any) => any, error?: string): Promise<any> {
        return this.baseFunction(request, callback, error);
    }
}