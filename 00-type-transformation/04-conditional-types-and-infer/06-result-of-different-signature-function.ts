// Parser 1: an object with a "parse" method returning a number
const parser1 = {
  parse: () => 42,
};

// Parser 2: a simple function returning a string
function parser2() {
  return "Hello, world!";
}

// Parser 3: an object with an "extract" method returning a boolean
const parser3 = {
  extract: () => true,
};

// Long-form solution using multiple ternaries
type GetParserResult_Solution1<T> = T extends { parse: () => infer TResult }
  ? TResult
  : T extends (...args: any[]) => infer TResult
  ? TResult
  : T extends { extract: () => infer TResult }
  ? TResult
  : never;

declare function getParserSolution<T>(
  parser: T
): GetParserResult_Solution1<typeof parser>;

getParserSolution(parser1); // `number`
getParserSolution(parser2); // `string`
getParserSolution(parser3); // `boolean`

// Cleaner solution using a union on the left side of "extends"
type GetParserResult_Solution2<T> = T extends
  | { parse: () => infer TResult }
  | ((...args: any[]) => infer TResult)
  | { extract: () => infer TResult }
  ? TResult
  : never;

declare function getParserSolution2<T>(
  parser: T
): GetParserResult_Solution2<typeof parser>;

getParserSolution2(parser1); // `number`
getParserSolution2(parser2); // `string`
getParserSolution2(parser3); // `boolean`
