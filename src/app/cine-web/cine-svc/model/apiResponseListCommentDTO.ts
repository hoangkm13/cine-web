/**
 * App API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: snapshot
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CommentDTO } from './commentDTO';


export interface ApiResponseListCommentDTO { 
    result?: Array<CommentDTO>;
    errorCode?: string;
    message?: object;
    responseCode?: number;
}

