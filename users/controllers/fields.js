const epxress = require('express');
const { EmployeeModel } = require('../../model/employee');
const authorizeToTakeOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const foundUser = await EmployeeModel.findById(userId);

        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        // Check if the user has the necessary permission to take orders
        if (foundUser.order) {
            next(); // User is authorized, proceed to the next middleware or route handler
        } else {
            return res.status(403).json({ message: 'Forbidden - Insufficient permissions to take orders' });
        }
    } catch (error) {
        console.error('Error in authorizeToTakeOrder middleware:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const authorizeToSales = async (req, res, next) => {
    try{const userId = req.user.id;
        const foundUser = await EmployeeModel.findById(userId);

        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

     
        if (foundUser.sale) {
            next(); // User is authorized, proceed to the next middleware or route handler
        } else {
            return res.status(403).json({ message: 'Forbidden - Insufficient permissions to take orders' });
        }
    } catch (error) {
        console.error('Error in authorizeToTakeOrder middleware:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
