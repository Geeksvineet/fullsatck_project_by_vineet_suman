const Subscription = require('../models/Subscription');

// Get all subscribed emails
exports.getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a subscription by ID
exports.deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.status(200).json({ message: "Subscription deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new contact submission
// Add a new subscription (subscribe an email)
exports.addSubscription = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email field is provided
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if the email is already subscribed
        const existingSubscription = await Subscription.findOne({ email });
        if (existingSubscription) {
            return res.status(400).json({ message: "Email is already subscribed" });
        }

        // Create a new Subscription document
        const newSubscription = new Subscription({ email });
        await newSubscription.save();

        res.status(201).json({
            message: "Subscription added successfully",
            subscription: newSubscription,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};