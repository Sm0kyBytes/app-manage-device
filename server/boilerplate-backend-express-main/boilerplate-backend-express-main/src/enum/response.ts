enum ReponseTitleEnum {
    SUCCESS = "Success",
    ERROR = "Error",
    WARNING = "Warning",
    INFO = "Info",
}
enum ReponseStatusCodeEnum {
    SUCCESS = 200,
    ERROR = 400,
    WARNING = 300,
    INFO = 100,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}
enum ReponseMessageEnum {
    SUCCESS = "Success",
}

export { ReponseTitleEnum, ReponseStatusCodeEnum, ReponseMessageEnum };
