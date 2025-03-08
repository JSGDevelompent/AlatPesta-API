import adminService from "../service/admin-service.js";

const checkAuth = async (req, res, next) => {
    try {
        res.status(200).json({
            message: 'Approve'
        });   
    } catch (error) {
        next(e)
        console.log(e)
    }
}

const checkAdmin = async (req, res, next) => {
    try {
        const result = await adminService.checkAdmin();
        res.status(200).json({
            message: 'Admin Already'
        })
    } catch (e) {
        next(e)
    }
}

const register = async (req, res, next) => {
    try {
        const result = await adminService.createAdmin(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await adminService.loginAdmin(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const updatePassword = async (req, res, next) => {
    try {
        await adminService.updatePasswordAdmin(req.body);
        res.status(200).json({
            message: "Password successfully changed! Please re-login"
        });
    } catch (e) {
        next(e)
    }
}

const updateUsername = async (req, res, next) => {
    try {
        await adminService.updateUsernameAdmin(req.body);
        res.status(200).json({
            message: "Username successfully changed! Please login again"
        });
    } catch (e) {
        next(e)
    }
}

export default {
    register,
    login,
    updatePassword,
    updateUsername,
    checkAdmin,
    checkAuth
}