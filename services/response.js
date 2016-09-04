'use strict';

var successObject = {
    data: '',
    pageCount: 0
};

var errorResponse = function (err) {
    return {
        "error": {
            "status_code": 200,
            "message": err
        }
    };
}

var successResponse = function (obj) {
    return {
        "success": {
            "status_code": 200,
            "recordCount": obj.pageCount,
            "data": obj.data
        }
    };
}

module.exports = {
    errorResponse: errorResponse,
    successResponse: successResponse,
    successObject: successObject
};