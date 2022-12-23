export function orderTotalFromBigger(discountes) {
    discountes.sort(function (a, b) {
        return a.total - b.total;
    });

    discountes.reverse();

    return discountes;
}



export function getDiscountByTotal(totalOrder: number, discounts): number {

    let result = 0

    for (let index = 0; index < discounts.length; index++) {
        const { total, discount } = discounts[index];
        if (totalOrder >= total) {
            result = discount;
            break;
        }
    }



    return result;

}

export function calculateDiscount(original_price: number, discount: number) {
    return original_price - (original_price * discount / 100)
}