/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderItem } from './OrderItem';
import type { SubmitQuestionVO } from './SubmitQuestionVO';

export type Page_SubmitQuestionVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<SubmitQuestionVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
