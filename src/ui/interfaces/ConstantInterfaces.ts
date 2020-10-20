import {PIImap} from "./ConfirmationProps";
import {AuthOption} from "./AuthOptionInterfaces";

export interface Constants {
    verification_options: AuthOption[],
    permittedOrigins: string,
    permittedOriginPatterns?: string,
    pii_map: PIImap,
    isProd?: boolean,
    direction: string,
    agent_port: string,
    headerImage: string,
    controllerUrlBase: string
}

export interface MessageMap {
    [index: string]: string
}