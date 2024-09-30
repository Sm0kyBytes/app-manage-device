export enum ErrorEnum {
    NOT_FOUND = "NotFoundError",
    INVALID_CREDENTIALS = "InvalidCredentialsError",
    UNAUTHORIZED_ERROR = "UnauthorizedError",
    VALIDATION_ERROR = "ValidationError",
    INVALID_EMAIL = "InvalidEmailError",
    INVALID_INPUT = "InvalidInputError",
    INVALID_CODE = "InvalidCodeError",
    INVALID_DATE_RANGE = "InvalidDateRangeError",
    DUPLICATED_EMAIL = "DuplicatedEmailError",
    DUPLICATED_USERNAME = "DuplicatedUsernameError",
    DUPLICATED_PHONE = "DuplicatedPhoneError",
    INVALID_PASSWORD = "InvalidPasswordError",
    FILEDS_INCOMPLETE = "FieldsIncompleteError",
    PERMISSION_ERROR = "PermissionError",
    PENDING_APPROVE = "PendingApproveError",
    ALREADY_REVIEW = "AlreadyReviewError",
    SOCIAL_NO_EMAIL = "SocialNoEmailError",
    SOCIAL_NO_PHONE = "SocialNoPhoneError",
    INVALID_REFRESH_TOKEN = "InvalidRefreshTokenError",
    INVALID_TOKEN = "InvalidTokenError",
    SAME_PASSWORD = "SamePasswordError",
    DUPLICATED_TRACKING = "DuplicatedTrackingError",
    API_GATEWAY = "InvalidAPIGatewayError",

    TO_MANY_REQUEST = "TooManyRequestError",
    TO_MANY_LOGIN = "TooManyLoginError",

    TO_MANY_OTP = "TooManySendOTPError",

    DUPLICATED_KEY = "DuplicatedKeyError",
    //Login
    INVALID_USERNAME_PASSWORD = "InvalidUsernamePasswordError",

    USER_NOT_ACTIVE = "UserLockedError",
    //Forgot
    INVALID_USER = "InvalidUserError",
    INVALID_OTP = "InvalidOTPError",
    // Activate
    MERCHANT_NOT_FOUND = "MerchantNotFoundError",

    DUPLICATED_MERCHANT = "DuplicatedMerchantError",
    DUPLICATED_TIN = "DuplicatedTinError",

    INVALID_VALIDATE_KEY = "InvalidValidateKeyError",

    INVALID_ROLE = "InvalidRoleError",
    INVALID_FORM = "InvalidFormError",
    INVALID_REASON = "InvalidReasonError",
    INVALID_STATUS = "InvalidStatusError",
    INVALID_STEP = "InvalidStepError",
    INVALID_MAX_LENGTH = "InvalidLengthError",
    INVALID_BASE64 = "InvalidBase64Error",
    INVALID_DATE_FORMAT = "InvalidDateFormatError",
    INVALID_CONSENT_FORM = "InvalidConsentFormError",
    INVALID_ENUM = "InvalidEnumError",
    INVALID_STRING = "InvalidStringError",
    INVALID_PHONE = "InvalidPhoneError",
    DUPLICATED_MERCHANT_NAME = "DuplicatedMerchantNameError",

    NOT_CONNECT_SQL = "ConnectSQLError",

    SQL_ERROR = "SQLError",
    NO_FILE_UPLOADED = "NoFileUploadedError",
    UNSUPPORT_FILE_FORMAT = "UnsupportedFileFormatError",
    LIMITRECORDS = "LimitRecordsError",
    INVALID_DATA_FORMAT = "InvalidDataFormatError",
    CREDIT_ENOUGH = "CreditIsNotEnoughError",
}