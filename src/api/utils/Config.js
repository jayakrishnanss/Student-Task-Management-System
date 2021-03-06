const config = {
    db: {
        host: 'localhost',
        port: 27017,
        name: 'stud_db'
    },
    messages: {
        login_success: 'User successfully logged in.',
        logout_success: 'User successfully logged out.',
        login_user_not_exists: 'User does not exists.',
        signup_success: 'User successfully created.',
        signup_user_exists: 'User already exists.',
        error: 'Oops! Something went wrong.',
        required_fields: 'Please fill out all required fields.',
        data_load_success: 'Data loaded successfully.',
        approve_success: 'User has been approved successfully',
        delete_success: 'User has been deleted successfully'
    },
    status: {
        success: 1,
        failure: 0
    }
};

module.exports = config;