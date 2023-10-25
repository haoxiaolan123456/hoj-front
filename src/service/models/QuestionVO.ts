/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudegConfig } from './JudegConfig';
import type { UserVO } from './UserVO';

export type QuestionVO = {
    acceptednum?: number;
    content?: string;
    createtime?: string;
    id?: number;
    judgeconfig?: JudegConfig;
    submitnum?: number;
    tags?: Array<string>;
    title?: string;
    updatetime?: string;
    user?: UserVO;
    userid?: number;
};
