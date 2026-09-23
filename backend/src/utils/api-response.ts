import { Response } from "express";
import { PaginationMeta } from "../types/index.js";

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message: string = "Success",
    statusCode: number = 200,
    pagination?: PaginationMeta
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      ...(pagination ? { pagination } : {}),
    });
  }

  static created<T>(res: Response, data: T, message: string = "Resource created successfully") {
    return ApiResponse.success(res, data, message, 201);
  }

  static error(
    res: Response,
    message: string = "Internal Server Error",
    statusCode: number = 500,
    errors: any[] = []
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors: Array.isArray(errors) ? errors : [errors],
    });
  }

  static badRequest(res: Response, message: string = "Bad Request", errors: any[] = []) {
    return ApiResponse.error(res, message, 400, errors);
  }

  static unauthorized(res: Response, message: string = "Unauthorized access") {
    return ApiResponse.error(res, message, 401);
  }

  static forbidden(res: Response, message: string = "Access forbidden. Insufficient permissions") {
    return ApiResponse.error(res, message, 403);
  }

  static notFound(res: Response, message: string = "Resource not found") {
    return ApiResponse.error(res, message, 404);
  }

  static conflict(res: Response, message: string = "Resource conflict") {
    return ApiResponse.error(res, message, 409);
  }
}
