interface ApiErrorResponse {
    response: { data: Array<string> | { error_message: string }; status: number };
}

export default ApiErrorResponse;
