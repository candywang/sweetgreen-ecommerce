import React, { useEffect, useState } from 'react';
import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import { formatPrice } from '../utils/format';
import GenericButton from './GenericButton';
import { useStore } from '../context/StoreContext';
import rewardsMock from '../mock/rewards';
import { Reward } from '../types/types';
import checkCartItems from '../utils/reward';

function ShoppingCart() {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const { closeCart, cartItems, isOpen } = useShoppingCart();
  const { storeMenu } = useStore();
  const [applicableRewards, setApplicableRewards] = useState<Reward[]>([]);

  useEffect(() => {
    const newApplicableRewards = rewardsMock.filter(reward =>
      checkCartItems(reward.applicableMenuItems, cartItems)
    );

    setApplicableRewards(newApplicableRewards);

    if (
      (selectedReward &&
        !newApplicableRewards.find(
          reward => reward.id === selectedReward.id
        )) ||
      cartItems.length === 0
    ) {
      setSelectedReward(null);
    }
  }, [cartItems, selectedReward]);

  const storeItems = storeMenu.flatMap(category => category.items);
  const subtotal = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find(i => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
  const discount =
    selectedReward && selectedReward.value ? selectedReward.value / 100 : 0;
  const formattedSubtotal = formatPrice(subtotal - discount);

  const onSelectReward = (reward: Reward) => {
    if (selectedReward && reward.id === selectedReward.id) {
      setSelectedReward(null);
    } else {
      setSelectedReward(reward);
    }
  };

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Review your pickup order</Offcanvas.Title>
        <Offcanvas.Title>Your Order</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(cartItem => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </Stack>
        <Stack gap={3}>
          {applicableRewards.map(reward => (
            <div key={reward.id}>
              <button type="submit" onClick={() => onSelectReward(reward)}>
                {reward.name}
              </button>
            </div>
          ))}
        </Stack>
        <div className="ms-auto fw-bold fs-5">
          Subtotal: {formattedSubtotal}
        </div>
        <div>*Reward discounts and final tax will be applied at checkout</div>
        <GenericButton to="checkout" onClick={closeCart}>
          Checkout
        </GenericButton>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
