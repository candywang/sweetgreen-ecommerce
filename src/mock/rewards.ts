import { RewardsMock } from '../types/types';

const rewardsMock: RewardsMock[] = [
  {
    id: 1,
    name: '$3 Off',
    description: 'Take $3 Off your total order',
    applicableMenuItems: [],
    value: 300,
  },
  {
    id: 2,
    name: '$2 Off',
    description: 'Take $2 Off your total order',
    applicableMenuItems: [],
    value: 200,
  },
  {
    id: 3, //bonus
    name: '$2 off when you order BBQ Salmon',
    description: 'Enjoy BBQ Salmon at a discount',
    applicableMenuItems: [1],
    value: 200,
  },
];

export default rewardsMock;
