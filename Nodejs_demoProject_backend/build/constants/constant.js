"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHONE_REGEX = exports.PASSWORD_REGEX = exports.EMAIL_REGEX = void 0;
exports.EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
exports.PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
exports.PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;
