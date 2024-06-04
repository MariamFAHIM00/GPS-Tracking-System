const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        res.status(204).json({ success: true, data: null });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.earningsByMonth = async (req, res) => {
    try {
    // Query the database to get earnings data
    const earningsData = await Order.aggregate([
      {
        $match: {
          $or: [
            { status: 'Confirmed' },
            { status: 'Completed' }
          ]
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          confirmed: {
            $sum: {
              $cond: [{ $eq: ["$status", "Confirmed"] }, "$totalPrice", 0]
            }
          },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "Completed"] }, "$totalPrice", 0]
            }
          }
        }
      },
      {
        $sort: { _id: 1 } // Sort by month
      },
      {
        $project: {
          name: { $dateToString: { format: "%b", date: new Date(0), timezone: "UTC" } },
          confirmed: "$confirmed",
          completed: "$completed"
        }
      }
    ]);

    res.json(earningsData);
  } catch (error) {
    console.error('Error fetching earnings data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

