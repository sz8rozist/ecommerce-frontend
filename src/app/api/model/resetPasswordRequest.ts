/**
 * My API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface ResetPasswordRequest { 
    token?: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

