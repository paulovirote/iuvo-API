import test from 'ava';
import { sum } from '../src/helpers/fourMath';

test('should sum the two argumets', (t) => {
  t.is(5, sum(2, 3));
});
