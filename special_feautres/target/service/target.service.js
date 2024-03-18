const { TargetModel } = require('../../../model/target');

const createtarget = async (body) => {
    try {
        return await TargetModel.create({
            TargetPeriod: body.TargetPeriod,
            CollectionAmount: body.CollectionAmount,
            StartDate: body.StartDate,
            OutletId: body.OutletId,
        });
    } catch (error) {
        console.error('Error creating target:', error.message);
        throw new ApiError(500, "Internal Server Error");
    }
}

module.exports = {
    createtarget,
}