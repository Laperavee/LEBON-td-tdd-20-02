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
            expect(basket.items).to.deep.include({id:this.count,name: 'Apple', price: 0.99});
        });
    });
    describe('applyCoupon', function() {
        it('2. Apply a valid coupon discount to an item', function() {
            basket.addItem('Apple', 100);
            const appleItem = basket.items.find(item => item.name === 'Apple');
            basket.applyCoupon(appleItem.id, 'COUPON1', 15);
            expect(basket.discounts[appleItem.id]).to.exist;
            expect(basket.discounts[appleItem.id].percentage).to.equal(15);
        });
        it('3. Not apply a discount to an item with invalid coupon code', function() {
            basket.addItem('Apple', 100);
            const appleItem = basket.items.find(item => item.name === 'Apple');
            basket.applyCoupon(appleItem.id, 'INVALID_COUPON', 15);
            expect(basket.discounts[appleItem.id]).to.not.exist;
        });
        it('4. Not apply a discount to an item with negative percentage', function() {
            expect(() => {
                basket.addItem('Apple', 100);
                const appleItem = basket.items.find(item => item.name === 'Apple');
                basket.applyCoupon(appleItem.id, 'COUPON1', -15);
            }).to.throw('Discount percentage cannot be inferior to 0 or superior to 100');
            expect(basket.discounts['Apple']).to.not.exist;
        });
        it('5. Not apply a discount to an item with percentage greater than original price', function() {
            expect(() => {
                basket.addItem('Apple', 100);
                const appleItem = basket.items.find(item => item.name === 'Apple');
                basket.applyCoupon(appleItem.id, 'COUPON1', 110);
            }).to.throw('Discount percentage cannot be inferior to 0 or superior to 100');
            expect(basket.discounts['Apple']).to.not.exist;
        });
        it('6. Apply a discount only once per item', function() {
            basket.addItem('Apple', 100);
            const appleItem = basket.items.find(item => item.name === 'Apple');
            basket.applyCoupon(appleItem.id, 'COUPON1', 15);
            basket.applyCoupon(appleItem.id, 'COUPON2', 20);
            expect(basket.discounts[appleItem.id]).to.exist;
            expect(basket.discounts[appleItem.id].percentage).to.equal(15);
        });


    });
});