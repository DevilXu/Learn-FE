const { getOptions } = require("loader-utils");
const validateOptions = require("schema-utils");

const schema = {
  type: "object",
  properties: {
    work: {
      type: 'String'
    },
    sick: {
      type: 'String'
    }
  }
};

module.exports = function(source) {
  const options = getOptions(this);
  validateOptions(schema, options, 'loader');

  const  {work, sick} = options;
  source = source.replace(/\[work\]/g, work).replace(/\[sick\]/g, sick);

  return `export default ${JSON.stringify(source)}`;
};
