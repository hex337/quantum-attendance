var Members = function(elem) {
  this.elem = elem;
  this.memberList = {};
  this.numMembers = 0;
};

Members.prototype.list = function() {
  return this.memberList;
}

Members.prototype.length = function() {
  console.log("Number of members: " + String(this.numMembers));
  return this.numMembers;
}

Members.prototype.addMembers = function(members) {
  for (var ndx = 0; ndx < members.length; ndx++) {
    this.addMember(members[ndx]);
  }
}

Members.prototype.addMember = function(member) {
  console.log("Adding a new member.");

  if (this.memberList[member.id]) {
    console.log("Member already exists, don't add them.");
    return;
  }

  this.numMembers = this.numMembers + 1;
  this.memberList[member.id] = member;
  this.createHTML();
};

Members.prototype.removeMember = function(id) {
  console.log("Removing member with id: " + id);

  if (this.memberList[id]) {
    delete this.memberList[id];
    this.numMembers = this.numMembers - 1;
    this.createHTML();
  }
};

Members.prototype.createHTML = function() {
  console.log("Rendering members HTML");
  var elem = this.elem;
  elem.empty();

  $.each(this.memberList, function(ndx, member) {
    var memberHTML = '<span class="selected-member" data-member-id="' + member.id + '">'
        + '<button class="btn btn-default" style="margin: 3px;" onclick="mem.removeMember(' + member.id + ');">'
          + member.value
        + '</button>'
        + '</span>'
        + '<br />';

    elem.append(memberHTML);
  });
};
