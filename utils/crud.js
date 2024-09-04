const response = require("./response");
const tryCatchError = require("./tryCatchError");

const create = async (res, data, model) => {
  try {
    await model.create(data);
    return response(res, 200, { message: "Created Successfully!" });
  } catch (error) {
    return tryCatchError(res, error);
  }
};
const read = async (res, data, model) => {
  try {
    const items = await model.find().populate("comments.userId");
    return response(res, 200, { message: "Data Fetched!", items });
  } catch (error) {
    return tryCatchError(res, error);
  }
};

const readOne = async (res, data, model) => {
  try {
    const { id } = data;
    if (!id) return response(res, 409, { message: "Id not received" });

    const item = await model.findById(id).populate("comments.userId");
    if (!item) return response(res, 404, { message: "Item not found" });

    return response(res, 200, { message: "Data Fetched!", item });
  } catch (error) {
    return tryCatchError(res, error);
  }
};

const update = async (res, data, model, id) => {
  try {
    if (!id) return response(res, 409, { message: "Id not received" });

    const item = await model.findById(id);
    if (!item) return response(res, 404, { message: "Item not found" });

    const updateQuery = data.comment
      ? { $push: { comments: data.comment } }
      : { ...data };
    const updatedItem = await model.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    return response(res, 200, { message: "Data Updated!", updatedItem });
  } catch (error) {
    return tryCatchError(res, error);
  }
};

const deleteItem = async (res, data, model) => {
  try {
    const { id } = data;
    if (!id) return response(res, 409, { message: "Id not received" });

    const item = await model.findById(id);
    if (!item) return response(res, 404, { message: "Item not found" });
    await model.findByIdAndDelete(id);
    return response(res, 200, { message: "Item Deleted!" });
  } catch (error) {
    return tryCatchError(res, error);
  }
};
module.exports = { create, read, readOne, update, deleteItem };
