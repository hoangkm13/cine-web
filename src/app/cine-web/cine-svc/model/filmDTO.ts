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
import { DislikeDTO } from './dislikeDTO';
import { LikeDTO } from './likeDTO';
import { Actor } from './actor';
import { Director } from './director';
import { CommentDTO } from './commentDTO';
import { Genre } from './genre';
import { View } from './view';


export interface FilmDTO { 
    id?: number;
    title: string;
    description: string;
    maturity: number;
    slug: string;
    year?: string;
    actors?: Array<Actor>;
    likes?: Array<LikeDTO>;
    dislikes?: Array<DislikeDTO>;
    comments?: Array<CommentDTO>;
    genres?: Array<Genre>;
    director?: Director;
    views?: Array<View>;
    ratingStar?: number;
    createdAt?: string;
    updatedAt?: string;
}

