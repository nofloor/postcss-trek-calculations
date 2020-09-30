function trekCalculations(options = {}) {
  return {
    postcssPlugin: 'postcss-trek-calculations',
    Declaration(decl) {
      decl.value = calculate(decl.value);
    }
  }
  
  function calculate(string) {
    const regex = /\B\([^\)\(]+\)/g;
    string = string.replace(regex, (found) => {
      const match = found.match(/([a-z]+)/g);
      let unit = '';
      if (match !== null) {
        unit = match[0];
        found = found.replace(/([a-z]+)/g, '');
      }
      return eval(found) + unit;
    });
    if (regex.test(string)) return calculate(string);
    return string;
  }
}

trekCalculations.postcss = true;

module.exports = trekCalculations;