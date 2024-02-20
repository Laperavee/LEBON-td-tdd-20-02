import { expect } from 'chai';
import { describe, it } from 'mocha';
import Basket from '../src/basket.js';
describe('Basket Class', function() {
    let basket;

    beforeEach(() => {
        basket = new Basket();
    });
    it('should add an item to the basket', function() {
        basket.addItem('Apple', 0.99);
        expect(basket.items).to.deep.include({ name: 'Apple', price: 0.99 });
    });
});