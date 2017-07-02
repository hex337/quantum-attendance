var Assistants = function(elem) {
  this.elem = elem;
  this.assistantList = {};
  this.numAssistants = 0;

  console.log("Initialized Assistants object.");
};

Assistants.prototype.list = function() {
  return this.assistantList;
}

Assistants.prototype.length = function() {
  console.log("Number of assistants: " + String(this.numAssistants));
  return this.numAssistants;
}

Assistants.prototype.addAssistants = function(assistants) {
  for (var ndx = 0; ndx < assistants.length; ndx++) {
    this.addAssistant(assistants[ndx]);
  }
}

Assistants.prototype.addAssistant = function(assistant) {
  console.log("Adding a new assistant.");

  if (this.assistantList[assistant.id]) {
    console.log("Assistant already exists, don't add them.");
    return;
  }

  this.numAssistants = this.numAssistants + 1;
  this.assistantList[assistant.id] = assistant;
  this.createHTML();
};

Assistants.prototype.removeAssistant = function(id) {
  console.log("Removing assistant with id: " + id);

  if (this.assistantList[id]) {
    delete this.assistantList[id];
    this.numAssistants = this.numAssistants - 1;
    this.createHTML();
  }
};

Assistants.prototype.createHTML = function() {
  console.log("Rendering members HTML");
  var elem = this.elem;
  elem.empty();

  elem.append('<table><thead></thead><tbody>');

  $.each(this.assistantList, function(ndx, assistant) {
    var memberHTML = '<tr>'
      + '<td style="padding:5px">' + assistant.value + '</td>'
      + '<td><button class="btn btn-default" onclick="window.assist.removeAssistant(' + assistant.id + ');">Remove</button></td>'
      + '</tr>';

    elem.append(memberHTML);
  });

  elem.append('</tbody></table>');
};
