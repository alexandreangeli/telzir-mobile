export interface IPlan {
  value: number;
  label: string;
}

export const plans: IPlan[] = [
  {
    label: 'FaleMais 30',
    value: 30,
  },
  {
    label: 'FaleMais 60',
    value: 60,
  },
  {
    label: 'FaleMais 120',
    value: 120,
  },
];
