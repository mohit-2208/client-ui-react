export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test((email).toLowerCase()) ? '' : 'Invalid email address';
};

export const validatePassword = (password) => {
    return password.length >= 6 ? '' : 'Password must be at least 6 characters long';
};

export const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    if (number.length > 10) {
        return 'Number Cannot be more than 10 digits';
    } else {
        return regex.test(number) ? '' : 'Please enter your Mobile Number';
    }
};

export const validateOTP = (otp) => {
    return otp.length >= 4 ? '' : 'OTP fields cannot be empty';
};