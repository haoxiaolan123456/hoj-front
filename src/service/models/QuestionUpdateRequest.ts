/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudegCase } from './JudegCase';
import type { JudegConfig } from './JudegConfig';

export type QuestionUpdateRequest = {
    answer?: string;
    content?: string;
    id?: number;
    judgeCase?: Array<JudegCase>;
    judgeConfig?: JudegConfig;
    tags?: Array<string>;
    title?: string;
    updateTime?: string;
    userId?: number;
};
