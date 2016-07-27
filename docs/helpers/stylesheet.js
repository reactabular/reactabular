function create() {
  const styleSheetElement = document.createElement('style');
  styleSheetElement.type = 'text/css';
  document.head.appendChild(styleSheetElement);

  const styleSheets = document.styleSheets;

  return {
    styleSheetElement,
    // Return the newly created stylesheet. We can assume it's the last.
    styleSheet: styleSheets[styleSheets.length - 1]
  };
}

function updateProperties(styleSheet, className, properties) {
  const existingRule = findExistingRule(styleSheet, className);

  if (existingRule) {
    Object.keys(properties).forEach(property => {
      existingRule.style[property] = properties[property];
    });
  } else {
    // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
    // Insert an empty rule to the top so we can add rules to it.
    styleSheet.insertRule(`.${className} {}`, 0);

    // The rule should exist now so try again.
    updateProperties(styleSheet, className, properties);
  }
}

function findExistingRule(styleSheet, className) {
  // http://stackoverflow.com/a/566445/228885
  const cssRuleCode = document.all ? 'rules' : 'cssRules'; // IE, FF
  const cssRules = styleSheet[cssRuleCode];
  let cssRule;
  let i;

  for (i = 0; i < cssRules.length; i++) {
    cssRule = cssRules[i];

    if (cssRule.selectorText === `.${className}`) {
      return cssRule;
    }
  }

  return null;
}

export default {
  create,
  updateProperties,
  findExistingRule
};
