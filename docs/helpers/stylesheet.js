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

// This could be generalized into something more useful
function updateWidth(styleSheet, className, width) {
  const existingRule = findExistingRule(styleSheet, className);

  if (existingRule) {
    existingRule.style.width = `${width}px`;
    existingRule.style.minWidth = `${width}px`;
  } else {
    // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
    // Insert to the top
    styleSheet.insertRule(
      `
      .${className} {
        width: ${width}px;
        min-width: ${width}px;
      }
      `,
      0
    );
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
  updateWidth,
  findExistingRule
};
