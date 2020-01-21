import {OrderStatus} from '../../helpers/order'

const en = {
    home: {
        main_legend: "Sparktrend is an online marketplace to buy and sell Instagram shoutouts.",
        targeted_influencers_desc: "We group subscribed influencers based on their overall insights, such as the top country location of their audience, age range, gender, active followers time and niche in order to make sure that buyers find the right influencers for their brands.",
        secure_transaction_desc: "Sparktrend will handle the payment and keep your money safe with us until your campaign has been completed by the influencer.",
        easy2_use_desc: "We make sure that everything is as user-friendly as possible so it will be easier for you to manage your campaign and transaction."
    },
    shoutout_history: "{0} out of {1}",
    demograph_chart: {
        age_range_desc: "This graph gives you the information of the age distribution of this page’s followers. This will help you to create the suitable content for your audiences.",
        location_desc: "This graph gives you the information of the countries distribution of this page’s followers.",
        gender_desc: "This graph gives you the information of the gender distribution of this page’s followers."
    },
    order: {
        error: {
            no_such_product: "No such product",
            invalid_product: "Invalid product",
            cannot_buy_own_product: "You cannot buy your own product",
            empty_posts: "Please provide at least one post",
            account_empty: "Account does not exists",
            paypal_error: "Paypal payment failed. Please try again later...",
            paid_amount_mismatch: "Payment total mismatch. Please try again later...",
            unverified_user: "Please verify your email first",
            unknown_action: "Unknown action",
            no_ownership: "You have no relationship to this order",
            rejected_order: "Rejected order",
            invalid_ownership: "Invalid action",
            expired_order: "Order has been expired.",
            invalid_start_time: "Cannot start order now. Please start an order on time...",
            cannot_complete_before_time: "Cannot complete order before time",
            invalid_action: "Invalid action",
            already_paid: "Order has been already paid",
            not_paid_yet: "Order is not paid yet",
            unknown_reason: "An error has occurred. Please try again later..."
        },
        success: {
            order_accepted: "Order has been accepted",
            order_rejected: "Order has been rejected",
            order_started: "Order has been started",
            order_completed: "Order has been completed",
            order_paid: "Payment was done successfully",
            order_refunded: "Refunded an order"
        }
    }
}

en.order_status = { shoutout: {}, payment: {}}
en.order_status.shoutout[OrderStatus.SHOUTOUT.NOT_CREATED] = 'Not created'
en.order_status.shoutout[OrderStatus.SHOUTOUT.CREATED] = 'Request'
en.order_status.shoutout[OrderStatus.SHOUTOUT.ACCEPTED] = 'Accepted'
en.order_status.shoutout[OrderStatus.SHOUTOUT.STARTED] = 'Ongoing'
en.order_status.shoutout[OrderStatus.SHOUTOUT.COMPLETED] = 'Completed'
en.order_status.shoutout[OrderStatus.SHOUTOUT.REJECTED] = 'Rejected'
en.order_status.shoutout[OrderStatus.SHOUTOUT.EXPIRED] = 'Expired'
en.order_status.payment[OrderStatus.PAYMENT.NOT_PAID] = 'Awaiting payment'
en.order_status.payment[OrderStatus.PAYMENT.PAID] = 'Paid'
en.order_status.payment[OrderStatus.PAYMENT.REFUNDED] = 'Refunded'
console.log(en)
export default en;