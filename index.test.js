const trekCalculations = require('./index')({});

test('regular expression', () => {
  const decl = { value: '' };
  
  decl.value = '3 * 4 / 6';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('3 * 4 / 6');
  
  decl.value = 'calc(3 * 4 / 6)';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('calc(3 * 4 / 6)');
});

test('basic calculations', () => {
  const decl = { value: '' };
  
  decl.value = '(3 * 4 / 6)';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('2');
  
  decl.value = '(2*3*1.5/(1+2))';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('3');
  
  decl.value = '(5 - 2*3 +10)';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('9');
  
  decl.value = '0 (3 * 4 / 6) 12px 0';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('0 2 12px 0');
});

test('calculation unit', () => {
  const decl = { value: '' };
  
  decl.value = '(3 * 4px / 6)';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('2px');
  
  decl.value = '(2*3rem*1.5px/(1+2em))';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('3rem');
});

test('mixed string', () => {
  const decl = { value: '' };
  
  decl.value = '4px (3px * 4 / 6) 2px 0';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('4px 2px 2px 0');
  
  decl.value = '4px (3px * 4 / 6) 2px (2 * 9 / 3px)';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('4px 2px 2px 6px');
  
  decl.value = '4px (3px * 4 / 6) 2px (2 * 9 / (3px + 3))';
  trekCalculations.Declaration(decl);
  expect(decl.value).toBe('4px 2px 2px 3px');
});