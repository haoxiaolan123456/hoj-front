/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudegConfig } from './JudegConfig';
import type { UserVO } from './UserVO';

export type QuestionVO = {
    acceptedNum?: number;
    answer?: string;
    content?: string;
    createTime?: string;
    id?: number;
    judgeCase?: string;
    judgeConfig?: JudegConfig;
    submitNum?: number;
    tags?: Array<string>;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
};
