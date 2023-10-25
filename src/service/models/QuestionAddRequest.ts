/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudegCase } from './JudegCase';
import type { JudegConfig } from './JudegConfig';

export type QuestionAddRequest = {
    answer?: string;
    content?: string;
    judgeCase?: Array<JudegCase>;
    judgeConfig?: JudegConfig;
    tags?: Array<string>;
    title?: string;
    userId?: number;
};
