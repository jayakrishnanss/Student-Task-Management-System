module.exports = {
    success: function (data) {
        var retData = {};
        retData.error = 0;
        retData.message = data.message;
        retData.status = data.status;
        try {
            if (data.accessToken)
                data.accessToken = data.accessToken.toString();
        } catch (err) {

        }
        retData.result = data.result;
        return retData;
    },
    error: function (data) {
        var retData = {};
        retData.error = 1;
        if (data && data.message)
            retData.message = data.message;
        else
            retData.message = "error";
        retData.result = {};
        return retData;
    }
};