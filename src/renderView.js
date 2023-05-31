const fs = require("fs-extra");
const path = require("path");

function renderTemplate(template, data) {

 var renderedHTML = '';

  // Xử lý vòng lặp {{#each}}
  var eachRegex = /{{#each\s+(.*?)}}([\s\S]*?){{\/each}}/g;
  template = template.replace(eachRegex, function(match, param, content) {
    var items = data[param.trim()];

    var itemHTML = '';
    for (var i = 0; i < items.length; i++) {
      var currentItem = items[i];
      var itemTemplate = content.replace(/{{this\.(.*?)}}/g, function (match, key) {
        return currentItem[key.trim()] || '';
      });
      itemHTML += itemTemplate;
    }

    return itemHTML;
  });

  // Xử lý các param còn lại
  var paramRegex = /{{(.*?)}}/g;
  renderedHTML = template.replace(paramRegex, function(match, param) {
    return data[param.trim()] || '';
  });

  return renderedHTML;
}

module.exports = function renderView(fileName = "", params) {
  const layoutPath = path.join(__dirname, "views/layouts/main.html");

  const layout = fs.readFileSync(layoutPath);

  if (!fileName) {
    return layout;
  } else {
    const viewPath = path.join(__dirname, `views/${fileName}.html`);
    const viewHtml = fs.readFileSync(viewPath);
    const viewHtmlWithParams = renderTemplate(viewHtml.toString(), params)
    const viewContent = layout.toString().replace('{{{body}}}', viewHtmlWithParams)
    return viewContent
  }
};
