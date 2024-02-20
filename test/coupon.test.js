import { expect } from 'chai';
import { describe, it } from 'mocha';
import Basket from '../src/basket.js';
describe('Basket Class', function() {
    let basket;

    beforeEach(() => {
        basket = new Basket();
    });
    describe('addItem()', function() {
        it('should add an item to the basket', function () {
            basket.addItem('Apple', 0.99);
            expect(basket.items).to.deep.include({name: 'Apple', price: 0.99});
        });
    });
    describe('applyCoupon', function() {
        it('2. Apply a valid coupon discount to an item', function() {
            basket.addItem('Apple', 100);
            basket.applyCoupon('Apple', 'COUPON1', 15);
            expect(basket.discounts['Apple']).to.exist;
            expect(basket.discounts['Apple']).to.equal(15);
        });
    });
});