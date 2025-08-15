import { NextResponse } from "next/server";

/**
 * Standard API response type for consistent response format
 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
};

/**
 * Creates a standardized API response
 * @param response The API response object
 * @returns NextResponse with consistent format
 */
export function createApiResponse<T>(response: ApiResponse<T>): NextResponse {
  const { statusCode, ...responseBody } = response;
  
  return NextResponse.json(
    responseBody,
    { status: statusCode }
  );
}

/**
 * Creates a success response
 * @param data The data to return
 * @param statusCode HTTP status code (defaults to 200)
 * @returns NextResponse with success format
 */
export function createSuccessResponse<T>(data: T, statusCode: number = 200): NextResponse {
  return createApiResponse({
    success: true,
    data,
    statusCode
  });
}

/**
 * Creates an error response
 * @param error Error message
 * @param statusCode HTTP status code (defaults to 400)
 * @returns NextResponse with error format
 */
export function createErrorResponse(error: string, statusCode: number = 400): NextResponse {
  return createApiResponse({
    success: false,
    error,
    statusCode
  });
}
