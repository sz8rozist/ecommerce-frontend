/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Role } from './role';


export interface User { 
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    roles?: Array<Role>;
}

