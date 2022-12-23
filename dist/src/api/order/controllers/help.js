"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiscount = exports.getDiscountByTotal = exports.orderTotalFromBigger = void 0;
function orderTotalFromBigger(discountes) {
    discountes.sort(function (a, b) {
        return a.total - b.total;
    });
    discountes.reverse();
    return discountes;
}
exports.orderTotalFromBigger = orderTotalFromBigger;
function getDiscountByTotal(totalOrder, discounts) {
    let result = 0;
    for (let index = 0; index < discounts.length; index++) {
        const { total, discount } = discounts[index];
        if (totalOrder >= total) {
            result = discount;
            break;
        }
    }
    return result;
}
exports.getDiscountByTotal = getDiscountByTotal;
function calculateDiscount(original_price, discount) {
    return original_price - (original_price * discount / 100);
}
exports.calculateDiscount = calculateDiscount;
