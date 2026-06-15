// import './basic-01';
// import './basic-02';
// import './basic-03';
// import './basic-04';
// import './basic-05';

export interface Lesson {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: string[];
}

export const lessons: Lesson[] = [
  {
    id: 'basic-01',
    number: 1,
    title: 'Basic Types & Type Inference',
    description:
      'Variables with string, number, boolean, const vs let, and how TypeScript infers types automatically.',
    topics: ['string', 'number', 'boolean', 'type inference', 'strict mode'],
  },
  {
    id: 'basic-02',
    number: 2,
    title: 'Union Types & the any Type',
    description:
      'Combining types with |, literal unions, the dangers of any, and optional chaining with object types.',
    topics: ['union types', 'literal unions', 'any', 'optional chaining'],
  },
  {
    id: 'basic-03',
    number: 3,
    title: 'Arrays & Objects',
    description:
      'Typed arrays, empty array gotchas, union type arrays, object type annotations, optional properties, and readonly properties.',
    topics: [
      'arrays',
      'objects',
      'optional properties',
      'readonly',
      'type annotations',
    ],
  },
  {
    id: 'basic-04',
    number: 4,
    title: 'Functions',
    description:
      'Function parameters, return types, explicit vs inferred returns, and the any trickle-down gotcha.',
    topics: [
      'function parameters',
      'return types',
      'type annotation',
      'any gotcha',
      'strict mode',
    ],
  },
  {
    id: 'basic-05',
    number: 5,
    title: 'Optional, Default & Rest Parameters',
    description:
      'Optional parameters with fallbacks, default parameter values, rest parameters collecting multiple arguments, void return type, and union types with typeof type guards.',
    topics: [
      'optional parameters',
      'default parameters',
      'rest parameters',
      'void return',
      'type guards',
      'union types',
    ],
  },
];
