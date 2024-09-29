const fruits = ["apple", "banana", "orange"] as const;

type AppleOrBanana = (typeof fruits)[0 | 1];
// This results in a type: 'apple' | 'banana'

type Fruit = (typeof fruits)[number];
// This results in a type: 'apple' | 'banana' | 'orange'
