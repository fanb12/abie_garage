// import order service
const orderService = require("../services/order.service");

async function createOrder(req, res, next) {
  // console.log(req.body.order_services.length);

  if (req.body.order_services.length < 1) {
    return res.status(400).json({
      error: "Please select at least one service!",
    });
  }
  try {
    const createdOrder = await orderService.createOrder(req.body);

    if (!createdOrder) {
      return res.status(400).json({
        error: "Failed/Incomplete to add the Order!",
      });
    } else {
      res.status(200).json({ status: "Order added successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: "Something went wrong!",
    });
  }
}

async function getAllOrders(req, res, next) {
  try {
    const AllOrders = await orderService.getAllOrders();

    // console.log(AllOrders)

    if (!AllOrders) {
      res.status(400).json({
        error: "Failed to get all Orders!",
      });
    } else if (AllOrders.length < 1) {
      res.status(400).json({
        error: "Failed to get all Orders!",
      });
    } else {
      res.status(200).json({
        status: "Orders retrieved successfully!",
        Orders: AllOrders,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: "Something went wrong!",
    });
  }
}

async function getsingleOrder(req, res, next) {
  const service_hash = req.params.hash;

  try {
    const singleOrder = await orderService.getsingleOrder(service_hash);

    // console.log(singleOrder)

    if (!singleOrder[0]?.order_id) {
      res.status(400).json({
        error: "Failed to get the Order!",
      });
    } else {
      res.status(200).json({
        status: "Order retrieved successfully! ",
        singleOrder: singleOrder,
      });
    }
  } catch (error) {}
}

async function updateorder(req, res, next) {
  // console.log(req.body);

  try {
    const updateOrder = orderService.updateOrder(req.body);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createOrder, getAllOrders, getsingleOrder, updateorder };
