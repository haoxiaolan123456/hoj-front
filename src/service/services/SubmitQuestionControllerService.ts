/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_SubmitQuestionVO_ } from '../models/BaseResponse_Page_SubmitQuestionVO_';
import type { SubmitQuestionQueryRequest } from '../models/SubmitQuestionQueryRequest';
import type { SubmitQuestionRequest } from '../models/SubmitQuestionRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SubmitQuestionControllerService {

    /**
     * SubmitQuestion
     * @param submitQuestionRequest submitQuestionRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static submitQuestionUsingPost(
submitQuestionRequest: SubmitQuestionRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/submit_question/',
            body: submitQuestionRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listSubmitQuestionPage
     * @param submitQuestionPageRequest submitQuestionPageRequest
     * @returns BaseResponse_Page_SubmitQuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listSubmitQuestionPageUsingPost(
submitQuestionPageRequest: SubmitQuestionQueryRequest,
): CancelablePromise<BaseResponse_Page_SubmitQuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/submit_question/list/page',
            body: submitQuestionPageRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
